import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Optional: for a better dropdown UI

const CourseSelector = () => {
  const [years, setYears] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [selectedBranch, setSelectedBranch] = useState(null);
  // const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch years
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/years")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => console.error("Error fetching years:", error));
  }, []);

  // Fetch branches based on selected year
  const fetchBranches = (yearId) => {
    axios
      .get(`http://localhost:3000/api/branches?year=${yearId}`)
      .then((response) => {
        setBranches(response.data);
      })
      .catch((error) => console.error("Error fetching branches:", error));
  };

  // Fetch semesters based on selected branch
  const fetchSemesters = (branchId) => {
    axios
      .get(`http://localhost:3000/api/semesters?branch=${branchId}`)
      .then((response) => {
        setSemesters(response.data);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  };

  // Fetch courses based on selected semester
  const fetchCourses = (semesterId) => {
    axios
      .get(`http://localhost:3000/api/courses?semester=${semesterId}`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };

  // Handle year change
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    setBranches([]);
    setSemesters([]);
    setCourses([]);
    setSelectedCourse(null);
    if (selectedOption) fetchBranches(selectedOption.value);
  };

  // Handle branch change
  const handleBranchChange = (selectedOption) => {
    setBranches([selectedOption]); // Update to single selection
    setSemesters([]);
    setCourses([]);
    setSelectedCourse(null);
    if (selectedOption) fetchSemesters(selectedOption.value);
  };

  // Handle semester change
  const handleSemesterChange = (selectedOption) => {
    setSemesters([selectedOption]); // Update to single selection
    setCourses([]);
    setSelectedCourse(null);
    if (selectedOption) fetchCourses(selectedOption.value);
  };

  // Handle course change
  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
  };

  // Format options for react-select
  const formatOptions = (data) =>
    data.map((item) => ({
      value: item._id,
      label: item.name || item.year || item.courseName || item._id, // Adjust based on your data
    }));

  return (
    <div style={{ padding: "20px", backgroundColor: "#1a1a2e", color: "#fff" }}>
      <h2>Courses</h2>
      <div>
        <label>Year</label>
        <Select
          options={formatOptions(years)}
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Select Year"
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Branch</label>
        <Select
          options={formatOptions(branches)}
          value={branches[0]} // Single selection
          onChange={handleBranchChange}
          placeholder="Select Branch"
          isDisabled={!selectedYear}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Semester</label>
        <Select
          options={formatOptions(semesters)}
          value={semesters[0]} // Single selection
          onChange={handleSemesterChange}
          placeholder="Select Semester"
          isDisabled={!branches.length}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Course</label>
        <Select
          options={formatOptions(courses)}
          value={selectedCourse}
          onChange={handleCourseChange}
          placeholder="Select Course"
          isDisabled={!semesters.length}
        />
      </div>
      {selectedCourse && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Course:</h3>
          <p>{selectedCourse.label}</p>
        </div>
      )}
    </div>
  );
};

export default CourseSelector;