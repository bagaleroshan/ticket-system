import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

let showAlert = async (get, url) => {
  try {
    let result = await MySwal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed === true) {
      let result = await axios({
        //    url: `http://localhost:8000/movie-tickets/${id}`,
        url: url,
        method: "delete",
      });
      get();
      console.log(result);
      //   toast(result.data.message);
    }
    console.log(result);
    //isConfirmed :true => if ok clicked
    //isDismissed :true =>if cancel button is clicked
  } catch (error) {
    console.log(error.message);
  }
};
export default showAlert;
