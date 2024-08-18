"use client";
import { getLeetCodeStats } from "@/actions/extraLinks";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Copy, CopyCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const LeetcodePerPerson = () => {
  const { id } = useParams();
  const {
    isPending,
    error,
    data: UserLeetCodeStat,
  } = useQuery({
    queryKey: ["userLeetcodeStats"],
    // @ts-ignore
    queryFn: () => getLeetCodeStats(id),
  });

  if (isPending) return <div>Loading...</div>;
  if (error) {
    const router = useRouter();
    router.push("/auth");
    return (
      <>Sorry there was an error fetching the data. Please try again later.</>
    );
  }
  console.log(UserLeetCodeStat.data);
  //   @ts-ignore
  const { easy_solved, medium_solved, hard_solved } = UserLeetCodeStat.data;
  const UserQuestionLevel = [
    { name: "Easy", value: easy_solved },
    { name: "Medium", value: medium_solved },
    { name: "Hard", value: hard_solved },
  ];
  console.log(UserQuestionLevel);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <h1 className="text-xl mt-4 ">
        LeetCode state of{" "}
        <span className="text-2xl">{UserLeetCodeStat?.data?.username}</span>
      </h1>
      <div className="w-full  flex mt-4  justify-center items-center">
        <div className=" w-1/2">
          <Image
            src={UserLeetCodeStat?.data?.leetcode_qr}
            className="h-32 object-contain border-2 self-start"
            alt="qr code"
            width={150}
            height={150}
          />
          <div className="flex mt-2  flex-row justify-center items-center gap-2">
            <Input
              value={UserLeetCodeStat?.data?.leetcode_url}
              //   label="Username"

              className=" "
            ></Input>
            <Copy  className="cursor-pointer active:scale-95" onClick={() => {
                toast("Copied to clipboard");
                navigator.clipboard.writeText(UserLeetCodeStat?.data?.leetcode_url);
            }}/>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={UserQuestionLevel}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {UserQuestionLevel.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default LeetcodePerPerson;
