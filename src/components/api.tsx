import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const AddUser = async (signupData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: string;
}) => {
  console.log(signupData);
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
      console.log("Signup successful! User type:", type); // Log success message
      // Optionally redirect to a success page or dashboard based on your app logic
    } else {
      console.error("Signup failed:", response.data.error); // Log error message
      // Display an error message to the user
    }
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
  } catch (error) {}
};
