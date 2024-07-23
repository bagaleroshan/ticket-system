import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios
    .get("http://localhost:8000/movies")
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("NO Data");
  }
  const data = await res.data;
  return data;
};
export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`http://localhost:8000/users/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      // name:data.name,
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
export const sendAdminAuthRequest = async (data) => {
  const res = await axios
    .post("http://localhost:8000/admins/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`http://localhost:8000/movies/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};

// export const newBooking = async (data) => {
//   const res = axios
//     .post("http://localhost:8000/bookings", {
//       movie: data.movie,
//       seatNumber: data.seatNumber,
//       date: data.date,
//       user: localStorage.getItem("userId"),
//     })
//     .catch((err) => console.log(err));
//   if (res.status !== 201) {
//     return console.log("unexpected error");
//   }
//   const resData = await res.data;
//   return resData;
// };

export const newBooking = async (data) => {
  try {
    const res = await axios.post("http://localhost:8000/bookings", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    });

    if (res.status !== 201) {
      console.log("unexpected error");
      return;
    }

    return res.data;
  } catch (err) {
    console.log(err);
    console.log("unexpected error");
  }
};

export const getBookingOfUser = async () => {
  try {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`http://localhost:8000/users/bookings/${id}`);
    // console.log(res);
    if (res.status !== 200) {
      console.log("unexpected error");
      return;
    }
    return res.data;
  } catch (err) {
    console.log(err);
    console.log("unexpected error");
  }
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`http://localhost:8000/bookings/${id}`)
    .catch((err) => console.log(err));
  console.log(res);
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`http://localhost:8000/users/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};
export const addMovies = async (data) => {
  const res = await axios
    .post(
      "http://localhost:8000/movies",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.features,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};

export const getAdminById = async (id) => {
  const adminId = localStorage.getItem("adminId");

  const res = await axios
    .get(`http://localhost:8000/admins/${adminId}`)
    .catch((err) => console.log(err));
  // console.log(res)
  if (res.status !== 200) {
    return console.log("unexpected error");
  }
  const resData = await res.data;
  return resData;
};
/*  const handelDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }; */
