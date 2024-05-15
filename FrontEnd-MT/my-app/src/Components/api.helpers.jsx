import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios
    .get("http://localhost:8000/movies")
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  return data;
};
export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`http://localhost:8000/users/${signup ? "signup" : "login"}`, {
      name: data.name,
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected error occurred");
  }
  const resData = await res.data;
  return resData;
};
export const sendAdminAuthRequest=async()=>{
  axios 
}
