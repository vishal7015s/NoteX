import React, { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables);

function InstructorChart({courses}) {
    const [currentChart, setCurrentChart] = useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    const chartDataStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    }

    const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            },
        ],
    }

    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="p-4">
            <p className="text-2xl font-semibold text-gray-800 mb-4">Visualize</p>
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setCurrentChart("students")} 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentChart === "students" 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Students
                </button>
                <button 
                    onClick={() => setCurrentChart("income")} 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentChart === "income" 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Income
                </button>
            </div>
            <div className="h-80">
                <Pie 
                    data={currentChart === "students" ? chartDataStudents : chartIncomeData} 
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorChart



// import React, { useState } from 'react'

// import { Chart, registerables } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// import  options  from 'dropzone';

// Chart.register(...registerables);

// function InstructorChart({courses}) {

//     const [currentChart, setCurrentChart] = useState("students");

//     const getRandomColors = (numColors) => {
//         const colors = [];
//         for(let i=0; i<numColors; i++){
//             const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
//             colors.push(color);
//         }
//         return colors;
//     }

//     const chartDataStudents = {
//         labels: courses.map((course) => course.courseName),
//         datasets: [
//           {
//             data: courses.map((course) => course.totalStudentsEnrolled),
//             backgroundColor: getRandomColors(courses.length),
//           },
//         ],
//       }
    
//       // Data for the chart displaying income information
//       const chartIncomeData = {
//         labels: courses.map((course) => course.courseName),
//         datasets: [
//           {
//             data: courses.map((course) => course.totalAmountGenerated),
//             backgroundColor: getRandomColors(courses.length),
//           },
//         ],
//     }
    
//       // Options for the chart
//       const options = {
//         maintainAspectRatio: false,
//     }

//   return (
//     <div>
//         <p>Visualise</p>
//         <div>
//             <button onClick={() => setCurrentChart("students")}>
//                 Student
//             </button>

//             <button onClick={() => setCurrentChart("income")}>
//                 Income
//             </button>
//         </div>

//         <div>
//             <Pie data={currentChart === "students" ? chartDataStudents : chartIncomeData} options={options}/>
//         </div>
//     </div>
//   )
// }

// export default InstructorChart