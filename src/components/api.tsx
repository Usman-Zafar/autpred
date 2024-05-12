import axios from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = "http://localhost:8000";

export const AddUser = async (signupData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signup`, signupData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle successful signup
    if (response.status === 200 || response.status === 201) {
      const { token, type } = response.data;
      localStorage.setItem("token", token); // Store token for authentication
    } else {
      console.error("Signup failed:", response.data.error); // Log error message
      // Display an error message to the user
    }
    return response.data;
  } catch (error) {
    console.error("Signup error:", error); // Handle network or other errors
    // Display an error message to the user
  }
};

export const GetUser = async (signinData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/signin`, signinData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token, type } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error("Signin error:", error);
  }
};

export const AddProfile = async (AddProfileData: {
  childname: string;
  age: number;
  parentemail: string;
  userId: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); // Casting to any type
      const userId = decodedToken.id;
      AddProfileData.userId = userId;
      const response = await axios.post(
        `${BASE_URL}/therapist/add-profile`,
        AddProfileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } else {
      // Handle case where token is not found in local storage
      console.error("Token not found in local storage");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    // Handle error while decoding the token
  }
};

export const GetProfiles = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); // Casting to any type
      const userId = decodedToken.id;
      const response = await axios.get(
        `${BASE_URL}/therapist/get-profiles?userId=${userId}`
      );
      return response.data;
    } else {
      // Handle case where token is not found in local storage
      console.error("Token not found in local storage");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};

export const AddTherapyDetails = async (AddTherapyData: {
  childname: string;
  date: string;
  time: string;
  userId: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); // Casting to any type
      const userId = decodedToken.id;
      AddTherapyData.userId = userId;
      const response = await axios.post(
        `${BASE_URL}/therapist/add-therapy-details`,
        AddTherapyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } else {
      // Handle case where token is not found in local storage
      console.error("Token not found in local storage");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    // Handle error while decoding the token
  }
};

export const GetTherapySessions = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token); // Casting to any type
      const userId = decodedToken.id;
      const response = await axios.get(
        `${BASE_URL}/therapist/get-therapy-details?userId=${userId}`
      );
      return response.data;
    } else {
      // Handle case where token is not found in local storage
      console.error("Token not found in local storage");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
};
