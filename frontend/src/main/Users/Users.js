import { Pagination, Table } from "flowbite-react";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import apiCaller from "../../core/api";
import { accessUserState } from "../../reducers/authReducer";
import { forceLoadUserState, usersState } from "../../reducers/usersReducer";

export default function Users() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 10;

  const authUser = useRecoilValue(accessUserState);
  const users = useRecoilValue(usersState({ page, page_size }));
  const reloadUsers = useSetRecoilState(forceLoadUserState);

  const { pagination } = users;

  useEffect(() => {
    if (authUser) {
      if (authUser.Role !== "admin") {
        navigate("/");
      }
    } else {
      navigate("/sign-in");
    }
  }, [authUser, navigate]);

  const onHandleDelete = useCallback(
    (id) => {
      toast
        .promise(
          apiCaller(`users/${id}`, "DELETE").then((res) => {
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
        .then(() => reloadUsers());
    },
    [reloadUsers]
  );

  return (
    <div>
      <Table className="mt-4">
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Vai Trò</Table.HeadCell>
          <Table.HeadCell>Trạng Thái</Table.HeadCell>
          <Table.HeadCell>SL Bài Đăng</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users?.items?.map((user) => (
            <Table.Row
              key={user._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{user.Email}</Table.Cell>
              <Table.Cell>
                {user.Role === "admin" && "Administrator"}
                {user.Role === "member" && "Thành Viên"}
              </Table.Cell>
              <Table.Cell>
                {user.Status === "active" && "Đang Kích Hoạt"}
              </Table.Cell>
              <Table.Cell>{user.Posts_Ref.length}</Table.Cell>
              <Table.Cell>
                {authUser.Email !== user.Email && (
                  <button
                    className="font-medium text-red-600 hover:underline dark:text-blue-500"
                    onClick={() => onHandleDelete(user._id)}
                  >
                    Xóa
                  </button>
                )}
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
