import {
  Button, Pagination, Table
} from "flowbite-react";
import React, { useCallback, useEffect } from "react";
import { User } from "react-feather";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import apiCaller from "../core/api";
import { accessUserState } from "../reducers/authReducer";
import { forceLoadPostState, postsState } from "../reducers/postsReducer";

export default function Admin() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 10;

  const authUser = useRecoilValue(accessUserState);
  const posts = useRecoilValue(postsState({ page, page_size }));
  const reloadPosts = useSetRecoilState(forceLoadPostState);

  const { pagination } = posts;

  useEffect(() => {
    if (authUser) {
      if (authUser.Role !== "admin") {
        navigate("/");
      }
    } else {
      navigate("/sign-in");
    }
  }, [authUser, navigate]);

  const onHandleUpdate = useCallback(
    (id, status) => {
      toast
        .promise(
          apiCaller(`posts/${id}`, "PUT", { data: { Status: status } }).then(
            (res) => {
              if (!res.results.data) {
                throw new Error(res.results.data.message);
              }
            }
          ),
          {
            loading: "Đang xử lý",
            success: "Xử lý thành công.",
            error: "Xử lý thất bại.",
          }
        )
        .finally(() => reloadPosts({}));
    },
    [reloadPosts]
  );

  const onHandleDelete = useCallback(
    (id) => {
      toast
        .promise(
          apiCaller(`posts/${id}`, "DELETE").then((res) => {
            if (!res.results.data) {
              throw new Error(res.results.data.message);
            }
          }),
          {
            loading: "Đang xử lý",
            success: "Xử lý thành công.",
            error: "Xử lý thất bại.",
          }
        )
        .then(() => reloadPosts());
    },
    [reloadPosts]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold">Administrator</span>
      </div>
      <div className="mt-1">
        <Button onClick={() => navigate("/users")}>
          <User size={13} className="mr-1 text-capitalize" /> Danh sách người
          dùng
        </Button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h5 className="font-bold capitalize">Danh sách công việc</h5>
      </div>
      <Table className="mt-4">
        <Table.Head>
          <Table.HeadCell>Tên công việc</Table.HeadCell>
          <Table.HeadCell>Người đăng</Table.HeadCell>
          <Table.HeadCell>Loại công việc</Table.HeadCell>
          <Table.HeadCell>Mức lương</Table.HeadCell>
          <Table.HeadCell>Ngành nghề</Table.HeadCell>
          <Table.HeadCell>Tình trạng</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {posts?.items?.map((post) => (
            <Table.Row
              key={post._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                <Link
                  to={`/posts/view/${post._id}`}
                  className="capitalize text-blue-600"
                >
                  {post.Title}
                </Link>
              </Table.Cell>
              <Table.Cell>{post?.User_Ref?.Email || "―"}</Table.Cell>
              <Table.Cell>{post.JobType}</Table.Cell>
              <Table.Cell>{post.JobSalary} VNĐ</Table.Cell>
              <Table.Cell>{post.JobCareer}</Table.Cell>
              <Table.Cell>
                {post.Status === "draft" && "Chưa Duyệt"}
                {post.Status === "published" && "Đã Duyệt"}
                {post.Status === "deleted" && "Không Duyệt"}
              </Table.Cell>
              <Table.Cell>
                {post.Status !== "published" && (
                  <button
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                    onClick={() => onHandleUpdate(post._id, "published")}
                  >
                    Duyệt
                  </button>
                )}
                {post.Status !== "deleted" && (
                  <button
                    className="font-medium text-red-600 hover:underline dark:text-blue-500 mr-3"
                    onClick={() => onHandleUpdate(post._id, "deleted")}
                  >
                    Không Duyệt
                  </button>
                )}
                <button
                  className="font-medium text-red-600 hover:underline dark:text-blue-500"
                  onClick={() => onHandleDelete(post._id)}
                >
                  Xóa
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex justify-end mt-2">
        <Pagination
          showIcons={true}
          currentPage={pagination.page}
          totalPages={pagination.pageTotal || 1}
          onPageChange={(page) => setSearchParams({ page, page_size })}
        />
      </div>
    </div>
  );
}
