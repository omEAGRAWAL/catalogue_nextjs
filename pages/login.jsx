import { useState } from "react";
import { useRouter } from "next/router";

export default function FirstPost() {
  const router = useRouter();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.token); // This will show the JWT token in the console

      // Save the token in localStorage
      localStorage.setItem("x-auth-token", result.token);
      router.push("/");

      console.log("Token saved to localStorage:", result.token);
    } else {
      console.error("Login failed");
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <p>Log in to your account</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Id</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="xyz@gmail.com"
            onChange={handleChange}
            value={formData.email} // bind value to the state
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={formData.password} // bind value to the state
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
