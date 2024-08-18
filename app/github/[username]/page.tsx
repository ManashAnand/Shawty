"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Link2Icon, ProjectorIcon, User } from "lucide-react";
import { AnimatedTooltip } from "@/components/custom/AnimatedTooltip";
import { v4 as uuidv4 } from "uuid";

const GithubStatPage: React.FC = () => {
  interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    type: string;
  }

  interface SimplifiedUser {
    login: string;
    avatar_url: string;
    type: string;
  }

  const { username } = useParams();

  // Initialize state to store fetched data
  const [data, setData] = useState<any[]>([]);

  // Function to fetch URLs synchronously
  const fetchUrlsSynchronously = async (urls: string[]): Promise<any[]> => {
    const results: any[] = [];

    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}`);
        }
        const data = await response.json();
        results.push(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    return results;
  };

  // UseEffect to fetch data once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const urls: string[] = [
        `https://api.github.com/users/${username}`,
        `https://api.github.com/users/${username}/followers`,
        `https://api.github.com/users/${username}/repos`,
      ];

      const result = await fetchUrlsSynchronously(urls);
      setData(result); // Update state with fetched data
    };

    fetchData();
  }, [username]); // Dependency array includes `username` to avoid unnecessary re-renders
  console.log(data);

  const animatedTips: SimplifiedUser[] = data[1]?.map((user: User) => ({
    id: uuidv4(),
    login: user.login,
    avatar_url: user.avatar_url,
    type: user.type,
  }));
  return (
    <div>
      <div className="flex gap-4 items-center">
        <FiGithub />
        <h1>Github Stat Page for {username}</h1>
      </div>
      <div className="w-full  flex items-center justify-between sm:flex-row flex-col">
        <Card className="mt-4 w-xl ">
          <CardHeader>
            <Avatar>
              <AvatarImage src={data[0]?.avatar_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardDescription>{data[0]?.bio}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <User />
            <Link href={data[0]?.blog || ""}>Portfolio</Link>
          </CardContent>
          <CardFooter className="flex items-center gap-4">
            <FiGithub />
            <Link href={`https://github.com/${username}`}>Github</Link>
          </CardFooter>
        </Card>

        <div className=" flex flex-col justify-between h-full ">
          <div className="text-2xl mb-10 text-slate-400">Followers</div>
          {/* @ts-ignore */}
          <AnimatedTooltip items={animatedTips} />
        </div>
      </div>

      <div className="mt-10">
        <CardDescription>REPOSITORY</CardDescription>
        <div className="grid sm:grid-cols-2 md:grid-cols-4">
          {
            // @ts-ignore

            data[2]?.map((item) => {
              return (
                <>
                  <Card className="mt-4 max-w-xs ">
                    <CardHeader>
                      <CardDescription className="flex items-center gap-4">
                        <ProjectorIcon />
                        {item?.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                      <Link2Icon />
                      <Link
                        href={
                          `https://github.com/ManashAnand/${item?.name}` || ""
                        }
                      >
                        Repo Link
                      </Link>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4">
                      <FiGithub />
                      <Link href={`https://github.com/${username}`}>
                        Github
                      </Link>
                    </CardFooter>
                  </Card>
                </>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default GithubStatPage;
