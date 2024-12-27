import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { Center, Flex, Heading, Stack } from "@chakra-ui/react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiUser } from "react-icons/bi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineNumbers } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
//import {useAddClientMutation,useGetClientQuery,useUpdateClientMutation} from "@/api/endpoints/clientEndpoints";
import { generateId } from "@/helpers";
import { Client } from "../types";
import { toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import InputClient from "@/components/InputClient";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addClient, editClient } from "@/slices/clientSlice";
import { clientSelector } from "@/selectors/clientSelector";

export interface FormValues {
  name: string;
  age: number;
  email: string;
  phone: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Requided Field").min(3).max(8),
  age: Yup.number()
    .integer("This field must be a integer")
    .min(20, "The client needs at least 20 years")
    .max(60, "Limit 60 years")
    .required("Requided Field"),
  email: Yup.string().email("Invalid email").required("Requided Field"),
  phone: Yup.string()
    .required("Required Field")
    .min(8, "Must be at least 8 characters")
    .max(15, "Must be 15 characters or less"),
});

const NewClient = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  //const [addClient] = useAddClientMutation();
  //const [updateClient] = useUpdateClientMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>() || {};
  {
    /**
    const { data } = useGetClientQuery(id || "", {
      skip: !id,
      refetchOnMountOrArgChange: true,
    });
     */
  }
  const { arrayClients } = useSelector(clientSelector);
  const data = arrayClients.filter((client) => client.id === id)[0];
  useEffect(() => {
    if (id && data) {
      reset({
        name: data?.name,
        age: data?.age,
        email: data?.email,
        phone: data?.phone,
      });
    }
  }, [id, data, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const newClient: Client = {
      id: id || generateId(),
      name: data.name,
      age: data.age,
      email: data.email,
      phone: data.phone,
    };
    if (id) {
      dispatch(editClient(newClient));
    } else {
      dispatch(addClient(newClient));
    }
    toaster.create({
      type: "success",
      title: "Successfuly",
      description: id ? "Updated client" : "Added client",
    });
    navigate("/");
    {
      /**
      try {
        if (id) {
          await updateClient([newClient, id]).unwrap();
        } else {
          await addClient(newClient).unwrap();
        }
        toaster.create({
          type: "success",
          title: "Successfuly",
          description: id ? "Updated client" : "Added client",
        });
        navigate("/");
      } catch (error) {
        console.error("Error adding client:", error);
      }
      */
    }
    reset();
  });
  return (
    <Center
      h="4xl"
      w={"full"}
      px={2}
      data-state="open"
      _open={{ animation: "fade-in 300ms ease" }}
    >
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Stack
          bg={"white"}
          maxW={{ base: "sm", md: "lg" }}
          gap="4"
          align="flex-center"
          w={"full"}
          border={"1px solid"}
          p={"5"}
          shadow={"2xl"}
          borderColor={"gray.100"}
          borderRadius={"sm"}
        >
          <Heading fontSize={"2xl"} color={"blackAlpha.800"}>
            {id ? "Edit Client" : "New Client"}
          </Heading>
          <Field
            required
            invalid={!!errors.name}
            errorText={errors.name?.message}
            orientation={"vertical"}
            label={"Customer name"}
          >
            <InputClient register={register} value="name" element={BiUser} />
          </Field>
          <Field
            required
            invalid={!!errors.email}
            errorText={errors.email?.message}
            orientation={"vertical"}
            label={"Customer email"}
          >
            <InputClient
              register={register}
              value="email"
              element={MdOutlineAttachEmail}
            />
          </Field>
          <Field
            required
            invalid={!!errors.age}
            errorText={errors.age?.message}
            orientation={"vertical"}
            label={"Customer Age"}
          >
            <InputClient
              register={register}
              value="age"
              element={MdOutlineNumbers}
            />
          </Field>
          <Field
            required
            invalid={!!errors.phone}
            errorText={errors.phone?.message}
            orientation={"vertical"}
            label={"Customer Phone"}
          >
            <InputClient register={register} value="phone" element={FaPhone} />
          </Field>
          <Flex justifyContent={"space-between"}>
            <Link to={"/"}>
              <Button variant={"subtle"}>
                {" "}
                <IoArrowBack /> Back
              </Button>
            </Link>
            <Button type="submit" bg={"blue.700"} variant={"solid"}>
              {id ? "Edit client" : "Add client"}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Center>
  );
};

export default NewClient;
