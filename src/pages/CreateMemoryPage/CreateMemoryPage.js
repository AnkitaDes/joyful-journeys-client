import { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CreateMemoryPage = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  // const history = useHistory();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const validateForm = () => {
    let formErrors = {};

    if (!description) formErrors.description = "Description is required";
    if (!image) formErrors.image = "Image is required";

    return formErrors;
  };

  const createMemory = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userId = localStorage.getItem("userId");

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/api/v1/create-memory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Clear the form
        setDescription("");
        setImage(null);
        setErrors({});

        // // Navigate to the UserProfilePage
        // history.push("/user-profile");
      } else {
        console.error("Server response indicates an error:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create Memory</h1>
      <form onSubmit={createMemory}>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p>{errors.description}</p>}
        </label>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {errors.image && <p>{errors.image}</p>}
        <button type="submit">Create Memory</button>
      </form>
    </div>
  );
};

export default CreateMemoryPage;
