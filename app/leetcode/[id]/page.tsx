"use client";
import { getLeetCodeStats } from "@/actions/extraLinks";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

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
        LeetCode state of <span className="text-2xl">{UserLeetCodeStat?.data?.username}</span>
      </h1>
      <ResponsiveContainer width="100%" height={400}>
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
    </>
  );
};

export default LeetcodePerPerson;
