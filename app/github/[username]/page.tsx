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
import { User } from "lucide-react";

const GithubStatPage: React.FC = () => {
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
  return (
    <div>
      <div className="flex gap-4 items-center">
        <FiGithub />
        <h1>Github Stat Page for {username}</h1>
      </div>
      <Card className="mt-4 max-w-xs">
        <CardHeader>
          <Avatar>
            <AvatarImage src={data[0]?.avatar_url} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardDescription>{data[0]?.bio}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <User />
          <Link href={data[0]?.blog}>Portfolio</Link>
        </CardContent>
        <CardFooter className="flex items-center gap-4">
          <FiGithub />
          <Link href={`https://github.com/${username}`}>Github</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GithubStatPage;
