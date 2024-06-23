import React, { useState } from "react";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "8be8b03d-4e14-48f5-ad70-bb121f90f214");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Fetch error", error);
      setResult("There was an error submitting the form.");
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="heading">
        Contact<span> Me</span>
      </h2>
      <form action="#" onSubmit={onSubmit}>
        <div className="input-box">
          <input type="text" name="name" placeholder="Full Name" required />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="input-box">
          <input type="text" name="phone" placeholder="Mobile Number" />
          <input
            type="text"
            name="subject"
            placeholder="Email Subject"
            required
          />
        </div>
        <textarea
          name="message"
          cols={30}
          rows={10}
          placeholder="Your Message"
          required
        ></textarea>
        <input type="submit" value="Send Message" className="btn" />
      </form>
    </section>
  );
};

export default Contact;
