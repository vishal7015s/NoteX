import React, { useState } from 'react'

import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import  options  from 'dropzone';

Chart.register(...registerables);

function InstructorChart({courses}) {

    const [currentChart, setCurrentChart] = useState("students");

    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
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
    
      // Data for the chart displaying income information
      const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
          {
            data: courses.map((course) => course.totalAmountGenerated),
            backgroundColor: getRandomColors(courses.length),
          },
        ],
    }
    
      // Options for the chart
      const options = {
        maintainAspectRatio: false,
    }

  return (
    <div>
        <p>Visualise</p>
        <div>
            <button onClick={() => setCurrentChart("students")}>
                Student
            </button>

            <button onClick={() => setCurrentChart("income")}>
                Income
            </button>
        </div>

        <div>
            <Pie data={currentChart === "students" ? chartDataStudents : chartIncomeData} options={options}/>
        </div>
    </div>
  )
}

export default InstructorChart