import toast from "react-hot-toast";
import { studentEndPoint } from "../apis";
import { apiConnector } from "../apiConnector";
import logo from "../../assets/download.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndPoint;

function loadScript(src) {
    return new Promise( (resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses},
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // console.log("resss ", orderResponse)

        const options = {
            key: "rzp_test_HRkwMuLRusT1KU",
            currency: orderResponse.data.currency,
            amount: `${orderResponse.data.amount}`,
            order_id: orderResponse.data.message.id,
            name: "NoteX",
            description: "Thank you for purchasing the course",
            image: logo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler:  function(response){
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);

                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment failed", function(response){
            toast.error("opps payment failed")
            console.log(response.error);
        })
    }
    catch(error){
        console.log("PAYMENT API ERROR.....", error)
        toast.error("could not make payment");
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount,
        },
        {
            Authorisation: `Bearer ${token}`
        }
    )
    }
    catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR.....", error);
    }
}

// verifyy payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
        Authorisation: `Bearer ${token}`,
      })
  
      console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
  
      toast.success("Payment Successful. You are Added to the course ")
      navigate("/dashboard/enrolled-courses")
      dispatch(resetCart())
    } catch (error) {
      console.log("PAYMENT VERIFY ERROR............", error)
      toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}