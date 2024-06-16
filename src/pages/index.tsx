import {
  useGetMissionsQuery,
  useGetUserMissionsQuery,
} from "@/features/mission/missionApi";
import useUserSelector from "@/features/user/useUserSelector";
import classNames from "classnames";
import { Inter } from "next/font/google";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import styles from "@/styles/home.module.css";
import { Card, Chip } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const { session } = useUserSelector();
  const { data: dataPublicMissions } = useGetMissionsQuery(null, {
    skip: session,
  });
  const { data: dataUserMissions } = useGetUserMissionsQuery(session, {
    skip: !session,
  });

  console.log("session => ", session);
  console.log(dataPublicMissions);
  console.log(dataUserMissions);

  const RenderMissions = ({ missions }) => {
    if (!missions) return;
    return (
      <div className={styles.missions}>
        {missions.map((pm) => {
          return (
            <Card className={styles.card} shadow="lg">
              <JsonView src={pm}></JsonView>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <main className={classNames(inter.className, styles.home)}>
        {session ? (
          <>
            <Chip variant="dot" color="warning">
              Disponibles
            </Chip>
            {RenderMissions({
              missions: dataUserMissions?.availables_missions,
            })}
            <Chip variant="dot" color="default">
              Antiguos
            </Chip>
            {RenderMissions({ missions: dataUserMissions?.oldMissions })}
          </>
        ) : (
          <>{RenderMissions({ missions: dataPublicMissions })}</>
        )}
      </main>
    </>
  );
}
