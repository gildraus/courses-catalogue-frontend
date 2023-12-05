import "../../styles/CoursesView.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";

const CoursesView = ({
  allCourses,
  allDepartments,
  allModules,
  coursesToShow,
  selectedAccreditation,
  selectedLevelOfStudy,
  selectedStudies,
  selectedModule,
  selectedSemester,
  selectedYearOfStudy,
  selectedDepartments,
  selectedCourse,
  emptyResponse,
  isSidebarVisible,
  setAllCourses,
  setCoursesToShow,
  setSelectedAccreditation,
  setSelectedLevelOfStudy,
  setSelectedStudies,
  setSelectedModule,
  setSelectedSemester,
  setSelectedYearOfStudy,
  setSelectedDepartments,
  setSelectedCourse,
  setEmptyResponse,
  setIsSidebarVisible,
  fetchFilteredCourses,
}) => {
  function toggle(groupName) {
    var displayType = document.getElementById(groupName).style.display;
    document.getElementById(groupName).style.display =
      displayType === "none" ? "inline" : "none";
    document.getElementById(groupName + "-arrow").style.rotate =
      displayType === "none" ? "180deg" : "0deg";
  }
  const handleAccreditationChange = (event) => {
    console.log("promena akreditacije" + event.target.value);
    setSelectedAccreditation(event.target.value);
  };

  const [isSmallScreen, setIsSmallScreen] = useState([false]);

  const createCheckboxChangeHandler = (state, setState) => (event) => {
    const { value, checked } = event.target;
    const updatedState = checked
      ? [...state, value]
      : state.filter((item) => item !== value);
    setState(updatedState);
  };
  useEffect(() => {
    fetchFilteredCourses();
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 992);
    }

    setIsSmallScreen(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
  }, [
    selectedAccreditation,
    selectedLevelOfStudy,
    selectedStudies,
    selectedModule,
    selectedSemester,
    selectedYearOfStudy,
    selectedDepartments,
  ]);

  // const handleCheckboxChange = (event) => {
  //   const { name, value, checked } = event.target;

  //   const updatedLevelOfStudy = checked
  //     ? [...selectedLevelOfStudy, value]
  //     : selectedLevelOfStudy.filter((item) => item !== value);
  //   setSelectedLevelOfStudy(updatedLevelOfStudy);
  // };

  const coursesToDisplay =
    coursesToShow.length > 0 ? coursesToShow : allCourses;

  const [currentPage, setcurrentPage] = useState(0);
  var numberOfPages = Math.ceil(coursesToDisplay.length / 10);

  const sortDataAtoZ = () => {
    const sortedData = [...coursesToDisplay];
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
    setCoursesToShow(sortedData);
    setAllCourses(sortedData);
  };

  const sortDataZtoA = () => {
    //coursesToDisplay ili coursesToShow???
    const sortedData = [...coursesToDisplay];
    sortedData.sort((a, b) => -a.name.localeCompare(b.name));
    setCoursesToShow(sortedData);
    setAllCourses(sortedData);
  };
  // const test = () => {
  //   setSelectedLevelOfStudy([]);
  //   setSelectedStudies([]);
  //   setSelectedModule([]);
  //   setSelectedSemester([]);
  //   setSelectedYearOfStudy([]);
  //   setSelectedDepartments([]);
  // };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="courses-view">
      <div className="courses-view-header">
        <button className="filter-button" onClick={toggleSidebar}>
          <img src="./images/filter-icon.png" alt="" />
          Филтери
        </button>
        <p
          className="reset-filter-text"
          onClick={() => {
            setEmptyResponse(false);
            window.location.reload();
          }}
        >
          Ресетуј филтере
        </p>
        {/* ovde bi trebalo da stoji dropdown ali iz nekog razloga bootstrap ne radi*/}
        <Dropdown className="sort-dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Сортирај приказ
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={sortDataZtoA}>
              Сортирај по називу опадајуће
            </Dropdown.Item>
            <Dropdown.Item onClick={sortDataAtoZ}>
              Сортирај по називу растуће
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="course-view-body">
        {isSidebarVisible ? (
          <div className="courses-view-sidebar col-lg-12 col-xs-12">
            {/* АКРЕДИТАЦИЈА */}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Акредитација</b>{" "}
                <img
                  id="acc-radio-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("acc-radio-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="acc-radio-group">
                <div>
                  {" "}
                  <input
                    type="radio"
                    value="2014"
                    name="acc"
                    checked={selectedAccreditation === "2014"}
                    onChange={handleAccreditationChange}
                  />{" "}
                  Акредитација 2014
                </div>
                <div>
                  <input
                    type="radio"
                    value="2020"
                    name="acc"
                    checked={selectedAccreditation === "2020"}
                    onChange={handleAccreditationChange}
                  />{" "}
                  Акредитација 2020
                </div>
              </div>
            </div>
            <hr className="filter-box-separator"></hr>
            {/* НИВО СТУДИЈА*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Ниво студија</b>{" "}
                <img
                  id="level-of-study-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("level-of-study-group")}
                  alt=""
                />
              </h4>
              <div id="level-of-study-group">
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Основне академске студије"
                    name="level_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedLevelOfStudy,
                      setSelectedLevelOfStudy
                    )}
                  />{" "}
                  Основне академске студије
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Мастер академске студије"
                    name="level_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedLevelOfStudy,
                      setSelectedLevelOfStudy
                    )}
                  />{" "}
                  Мастер академске студије
                </div>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Специјалистичке академске студије"
                    name="level_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedLevelOfStudy,
                      setSelectedLevelOfStudy
                    )}
                  />{" "}
                  Специјалистичке академске студије
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="Докторске студије"
                    name="level_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedLevelOfStudy,
                      setSelectedLevelOfStudy
                    )}
                  />{" "}
                  Докторске студије
                </div>
              </div>
              <hr className="filter-box-separator"></hr>
            </div>
            {/* СМЕР*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Смер</b>{" "}
                <img
                  id="studies-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("studies-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="studies-group">
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="ИСИТ"
                    name="studies"
                    onChange={createCheckboxChangeHandler(
                      selectedStudies,
                      setSelectedStudies
                    )}
                  />{" "}
                  Информациони системи и технологије
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="МЕН"
                    name="studies"
                    onChange={createCheckboxChangeHandler(
                      selectedStudies,
                      setSelectedStudies
                    )}
                  />{" "}
                  Менаџмент и организација
                </div>
              </div>

              <hr className="filter-box-separator"></hr>
            </div>

            {/* МОДУЛ*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Модул</b>{" "}
                <img
                  id="module-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("module-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="module-group">
                {/* 
                    ovde cemo automotazivati module iz baze

              {allModules.map((modul, index) => (
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value={modul.name}
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  {modul.name}
                </div>
              ))} */}

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Општи смер"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Општи смер(2014)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Менаџмент"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Менаџмент(2014)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Операциони менаџмент"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Операциони менаџмент(2014)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Менаџмент квалитета и стандардизација"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Менаџмент квалитета и стандардизација(2014)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Информациони системи"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Информациони системи(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Информационе технологије"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Информационе технологије(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Технологије електронског пословања"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Технологије електронског пословања(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Софтверско инжењерство"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Софтверско инжењерство(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Пословна аналитика"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Пословна аналитика(2020)
                </div>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Информационо инжењерство"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Информационо инжењерство(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Лин организација пословања"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Лин организација пословања(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Маркетинг менаџмент и комуникације"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Маркетинг менаџмент и комуникације(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Менаџмент квалитета и стандардизације"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Менаџмент квалитета и стандардизације(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Операциони менаџмент"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Операциони менаџмент(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Пројектни менаџмент"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Пројектни менаџмент(2020)
                </div>

                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="Финансијски менаџмент"
                    name="module"
                    onChange={createCheckboxChangeHandler(
                      selectedModule,
                      setSelectedModule
                    )}
                  />{" "}
                  Финансијски менаџмент(2020)
                </div>
              </div>

              <hr className="filter-box-separator"></hr>
            </div>

            {/* Семестар*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Семестар</b>{" "}
                <img
                  id="semester-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("semester-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="semester-group">
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="летњи"
                    name="semester"
                    onChange={createCheckboxChangeHandler(
                      selectedSemester,
                      setSelectedSemester
                    )}
                  />{" "}
                  Летњи семестар
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="зимски"
                    name="semester"
                    onChange={createCheckboxChangeHandler(
                      selectedSemester,
                      setSelectedSemester
                    )}
                  />{" "}
                  Зимски семестар
                </div>
              </div>

              <hr className="filter-box-separator"></hr>
            </div>

            {/* Година студија*/}
            <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Година студија</b>{" "}
                <img
                  id="year-of-study-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("year-of-study-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="year-of-study-group">
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="1"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Прва
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="2"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Друга
                </div>
                <div>
                  {" "}
                  <input
                    type="checkbox"
                    value="3"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Трећа
                </div>
                <div>
                  <input
                    type="checkbox"
                    value="4"
                    name="year_of_study"
                    onChange={createCheckboxChangeHandler(
                      selectedYearOfStudy,
                      setSelectedYearOfStudy
                    )}
                  />{" "}
                  Четврта
                </div>
              </div>

            </div>

            {/* Катедра*/}
            {/* <div className="filter-box">
              <h4 className="filter-box-header">
                <b>Катедра</b>{" "}
                <img
                  id="department-group-arrow"
                  src="./images/feArrowDown0.png"
                  onClick={() => toggle("department-group")}
                  className="clickable-pointer"
                  alt=""
                />
              </h4>
              <div id="department-group">
                {allDepartments.map((department, index) => (
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      value={department.name}
                      name="departments"
                      onChange={createCheckboxChangeHandler(
                        selectedDepartments,
                        setSelectedDepartments
                      )}
                    />{" "}
                    {department.name}
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        ) : (
          <div></div>
        )}

        {!isSidebarVisible || !isSmallScreen ? (
          <div className="courses-view-cards">
            {emptyResponse ? (
              <div className="cards-not-found">
                <img src="./images/EmptyState.png" alt="" />
                <h2>Није пронађен ниједан курс!</h2>
                <h4>Пробајте да претражите по другим параметрима.</h4>
              </div>
            ) : (
              coursesToDisplay
                .slice(
                  currentPage * 10,
                  currentPage * 10 + 10 < coursesToDisplay.length
                    ? currentPage * 10 + 10
                    : coursesToDisplay.length
                )
                .map((course, index) => (
                  <div
                    key={index}
                    className="courses-view-card clickable"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="courses-view-card-left">
                      <img src="./images/Imagery.png" alt="" />
                    </div>
                    <div className="courses-view-card-right">
                      <h4>
                        <b>{course.name}</b>
                      </h4>
                      <p className="department-card-item">
                        {course.departments.join(", ")}
                      </p>

                      <div className="espb-and-lecturers-card-items">
                        <div className="espb-card-item">
                          <div>
                            <img
                              src="./images/ic_round-star.png"
                              className="courses-view-card-icon"
                              alt=""
                            />
                          </div>
                          <p>{course.espb} ЕСПБ</p>
                        </div>
                        <div className="lecturers-card-item">
                          <div>
                            <img
                              src="./images/clarity_group-solid.png"
                              className="courses-view-card-icon"
                              alt=""
                            />
                          </div>
                          <p>{course.lecturers.join(", ")}</p>
                        </div>
                      </div>

                      <div className="card-options-group">
                        {course?.status === "обавезан" && (
                          <div className="card-option-mandatory">
                            Обавезан предмет
                          </div>
                        )}
                        {course?.status === "изборни" && (
                          <div className="card-option-optional">
                            Изборни предмет
                          </div>
                        )}

                        {course?.note && (
                          <div className="card-option-condition">
                            <img src="./images/danger.png" alt="" />
                            {course.note}
                          </div>
                        )}

                        <div className="card-option-warning">
                          <img src="./images/warning.png" alt="" />
                          Упозорење везано за курс
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}

            {!emptyResponse && (
              <div className="pagination">
                <div className="empty-div"></div>
                <div className="arrow-circle-container">
                  <div
                    className="arrow-circle"
                    onClick={() => {
                      if (currentPage > 0) setcurrentPage(currentPage - 1);
                    }}
                  >
                    ←
                  </div>
                  <div
                    className="arrow-circle"
                    onClick={() => {
                      if (currentPage < numberOfPages - 1)
                        setcurrentPage(currentPage + 1);
                    }}
                  >
                    →
                  </div>
                </div>
                <div className="page-counter-container">
                  Страна &nbsp;
                  <div className="page-counter">
                    &nbsp;{currentPage + 1}&nbsp;&nbsp;
                    <div className="triangle-container">
                      <div>▲</div>
                      <div>▼</div>
                    </div>
                    &nbsp;
                  </div>
                  &nbsp; од {numberOfPages}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CoursesView;
