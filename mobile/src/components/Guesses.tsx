import { FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";
import { EmptyMyPoolList } from "./EmptyMyPoolList";

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  const fetchGames = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${poolId}/games`);

      setGames(response.data.games);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Nao foi possivel carregar os jogos!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuessConfirm = async (gameId: string) => {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: "Informe o placar!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      console.log(`/pools/${poolId}/games/${gameId}/guesses`);

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite Realizado com Sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      fetchGames();
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Nao foi possivel enviar o palpite!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  };

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}
