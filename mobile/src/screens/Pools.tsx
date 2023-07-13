import { FlatList, Icon, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import Button from "../components/Button";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { useCallback, useState } from "react";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

const Pools = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();
  const fetchPools = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("pools");
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Nao foi possivel carregar os boloes!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Recarregar o UserEffect toda vez q entra na rota
  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus Boloes" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLAO POR CODIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("find")}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          px={5}
          //tira o scroll
          showsVerticalScrollIndicator={false}
          //espaco de respiro
          _contentContainerStyle={{
            pb: 10,
          }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
};

export default Pools;
