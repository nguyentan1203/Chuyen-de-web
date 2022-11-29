import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { postState } from "../../reducers/postsReducer";

export default function PostsDetail() {
  const { id } = useParams();

  const post = useRecoilValue(postState(id));

  return (
    <div>
      <h1 class="font-medium leading-tight text-2xl my-2">{post.Title}</h1>
      <p>Loại việc làm: {post.JobType}</p>
      <p>
        Mức lương:{" "}
        {Number(post.JobSalary).toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <p>Cấp bậc: {post.JobLevel}</p>
      <p>Kinh nghiệm: {post.JobExperience}</p>
      <p>Ngành nghề: {post.JobCareer}</p>
      <h1 class="font-medium leading-tight text-xl my-2 text-blue-600">
        Mô Tả Công Việc
      </h1>
      <p dangerouslySetInnerHTML={{ __html: post.Content }}></p>
      <h1 class="font-medium leading-tight text-xl my-2 text-blue-600">
        Yêu Cầu Công Việc
      </h1>
      <p dangerouslySetInnerHTML={{ __html: post.RequireContent }}></p>
      <h1 class="font-medium leading-tight text-xl my-2 text-blue-600">
        Quyền Lợi Chi Tiết
      </h1>
      <p dangerouslySetInnerHTML={{ __html: post.BenefitContent }}></p>
    </div>
  );
}
