import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import Button from "../components/Button";

import Logo from "../assets/logo.svg";
import { useState } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";

const New = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const handlePoolCreate = async () => {
    if (!title.trim()) {
      // Alert.alert("Novo Bolao", "Informe um nome para o seu bolao!");
      return toast.show({
        title: "Informe um nome para o seu bolao!",
        placement: "top",
        bgColor: "red.500",
      });
    }
    try {
      setIsLoading(true);

      await api.post("/pools", { title });

      toast.show({
        title: "Bolao criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      setTitle("");
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Nao foi possivel criar o bolao!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo Bolao" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu proprio bolao da copa {"\n"} e compartilhe entre amigo!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolao?"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="CRIAR MEU BOLAO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Apos criar seu bolao, voce recebera um codigo unico que podera usar
          para convidar outras pessoas
        </Text>
      </VStack>
    </VStack>
  );
};

export default New;
