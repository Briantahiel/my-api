 "use client"
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import User from "../types/user";

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 50px auto;
`;

const Form = styled.form`
  max-width: 540px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: auto;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UserListContainer = styled.div`
  margin-top: 20px;
  max-width: 540px;
  margin: auto;

  h2 {
    text-align: center;
  }
`;

const UserItem = styled.li`
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddUserForm = () => {
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    lastname: "",
    city: "",
    country: ""
  });

  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        setUserList(data.users);
      } else {
        console.error("Error al obtener la lista de usuarios:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.lastname || !formData.city || !formData.country) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    try {
      let response;
      if (selectedUserId) {
        response = await fetch(`/api/user/${selectedUserId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
      }
      if (response.ok) {
        await fetchUserList();
        setFormData({
          id: "",
          name: "",
          lastname: "",
          city: "",
          country: ""
        });
        setSelectedUserId(null);
      } else {
        console.error("Error al enviar datos:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await fetchUserList();
      } else {
        console.error("Error al eliminar usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleUpdate = (id: string, user: User) => {
    setFormData(user);
    setSelectedUserId(id);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Lastname"
        />
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <Input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <Button type="submit">{selectedUserId ? "Update" : "Create"}</Button>
      </Form>
      <UserListContainer>
        <h2>User List</h2>
        <ul>
          {userList.map(user => (
            <UserItem key={user.id}>
              {user.name} {user.lastname}, {user.city}, {user.country}
              <DeleteButton onClick={() => handleDelete(user.id)}>Delete</DeleteButton>
              <UpdateButton onClick={() => handleUpdate(user.id, user)}>Update</UpdateButton>
            </UserItem>
          ))}
        </ul>
      </UserListContainer>
    </FormContainer>
  );
};

export default AddUserForm;

