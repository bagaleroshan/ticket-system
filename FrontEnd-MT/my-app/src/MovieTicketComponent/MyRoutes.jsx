import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { GlobalVariableContext } from "../MyProject";
import AdminRegister from "./AdminRegister";
import CreateMovie from "./CreateMovie";
import NavBar from "./NavBar";
import ReadAllMovieTicket from "./ReadAllMovieTicket";
import UpdateMovieTicket from "./UpdateMovieTicket";
import ViewMovieTicket from "./ViewMovieTicket";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import Logout from "./Logout";
import UpdatePassword from "./UpdatePassword";
import ReadAllUser from "./ReadAllUser";
import MyProfile from "./MyProfile";
import ProfileUpdate from "./ProfileUpdate";
import ReadSpecificUser from "./ReadSpecificUser";
import UpdateSpecificUser from "./UpdateSpecificUser";

const MyRoutes = () => {
  //rtk
  // let dispatch = useDispatch();
  // let movieTicketData = useSelector((store) => {
  //   return store.movieTicket;
  // });
  // console.log(movieTicketData);

  let { token, setToken } = useContext(GlobalVariableContext);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavBar></NavBar>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<div>home page</div>}></Route>

          <Route
            path="/create-movie-ticket"
            element={<CreateMovie></CreateMovie>}
          ></Route>
          <Route
            path="movie-tickets"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route
              index
              element={<ReadAllMovieTicket></ReadAllMovieTicket>}
            ></Route>
            <Route
              path=":id"
              element={<ViewMovieTicket></ViewMovieTicket>}
            ></Route>

            <Route
              path="update"
              element={
                <div>
                  <Outlet></Outlet>
                </div>
              }
            >
              <Route index element={<div>UpdateMovieTicket</div>}></Route>
              <Route
                path=":id"
                element={<UpdateMovieTicket></UpdateMovieTicket>}
              ></Route>
            </Route>
          </Route>

          <Route
            path="verify-email"
            element={<VerifyEmail></VerifyEmail>}
          ></Route>

          <Route
            path="admin"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route
              path="register"
              element={<AdminRegister></AdminRegister>}
            ></Route>

            {token ? (
              <>
                <Route
                  path="update-password"
                  element={<UpdatePassword></UpdatePassword>}
                ></Route>
                <Route
                  path="profile-update"
                  element={<ProfileUpdate></ProfileUpdate>}
                ></Route>
                <Route path="logout" element={<Logout></Logout>}></Route>

                <Route
                  path="my-profile"
                  element={<MyProfile></MyProfile>}
                ></Route>
                <Route
                  path="read-all-user"
                  element={
                    <div>
                      <ReadAllUser></ReadAllUser>
                    </div>
                  }
                ></Route>
                <Route
                  path=":id"
                  element={<ReadSpecificUser></ReadSpecificUser>}
                ></Route>
                <Route
                  path="update"
                  element={
                    <div>
                      <Outlet></Outlet>
                    </div>
                  }
                >
                  <Route
                    path=":id"
                    element={<UpdateSpecificUser></UpdateSpecificUser>}
                  ></Route>
                </Route>
              </>
            ) : (
              <>
                <Route path="login" element={<Login></Login>}></Route>
              </>
            )}

            <Route
              path="forget-password"
              element={<ForgetPassword></ForgetPassword>}
            ></Route>
            <Route path="*" element={<div>404 page not found.</div>}></Route>
          </Route>
        </Route>
      </Routes>

      {/* <div>{movieTicketData.movieName}</div>
      <button
        onClick={() => {
          dispatch(changeMovieName("nepali"));
        }}
      >
        Change name
      </button> */}
    </div>
  );
};

export default MyRoutes;
