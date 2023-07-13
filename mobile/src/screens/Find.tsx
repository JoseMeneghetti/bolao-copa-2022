import { Heading, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import Logo from "../assets/logo.svg";
import Button from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

const Find = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const toast = useToast();
  const { navigate } = useNavigation();

  const handleJoinPool = async () => {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        // Alert.alert("Novo Bolao", "Informe um nome para o seu bolao!");
        return toast.show({
          title: "Informe um codigo!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Voce entrou no bolao com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      console.log(error);

      setIsLoading(false);

      if (error.response?.data.message === "Pool not found") {
        return toast.show({
          title: "Bolao nao encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (error.response?.data.message === "You already joined this pool.") {
        return toast.show({
          title: "Voce ja esta nesse bolao!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Houve um problema ao buscar o bolao!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por codigo" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontrar um bolao atraves de {"\n"} um codigo unico.
        </Heading>

        <Input
          mb={2}
          placeholder="Codigo do bolao"
          autoCapitalize="characters"
          onChangeText={setCode}
          value={code}
        />

        <Button title="BUSCAR BOLAO" onPress={handleJoinPool} />
      </VStack>
    </VStack>
  );
};

export default Find;
