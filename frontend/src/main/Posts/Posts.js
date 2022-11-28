import { Button, Label, Modal, Pagination, Spinner, Table, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useState } from "react";
import { Key } from "react-feather";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import apiCaller from "../../core/api";
import { delayLoading } from "../../core/commonFuncs";
import { accessUserState } from "../../reducers/authReducer";
import { forceLoadPostState, postsState } from "../../reducers/postsReducer";

export default function Posts() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 10;

  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const authUser = useRecoilValue(accessUserState);
  const posts = useRecoilValue(
    postsState({ user: authUser?._id, page, page_size })
  );
  const reloadPosts = useSetRecoilState(forceLoadPostState);

  const { pagination } = posts;

  useEffect(() => {
    if (!authUser) {
      navigate("/sign-in");
    }
  }, [authUser, navigate]);

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
        .finally(() => reloadPosts({}));
    },
    [reloadPosts]
  );

  const onChangePassword = useCallback(async (e) => {
    e.preventDefault();

    setLoading(true);
    await delayLoading();

    const { OldPassword, NewPassword, ReNewPassword } = e.target;
    if (NewPassword.value !== ReNewPassword.value) {
      toast.error("Mật khẩu mới không khớp.");
      setLoading(false);
      return;
    }

    const data = {
      OldPassword: OldPassword.value,
      NewPassword: NewPassword.value,
    };

    const changePassword = await apiCaller("users/change-password", "PUT", {
      data,
    })
      .then((res) => res?.results)
      .catch((err) => {
        const { message } = err.response.data;
        if (message === "ERROR_SIGN_IN_WRONG_PASSWORD") {
          return toast.error("Mật khẩu cũ không đúng.");
        }
        return toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      })
      .finally(() => setLoading(false));
    if (changePassword.data) {
      toast.success("Đổi mật khẩu thành công.");
    }
  }, []);

  return (
    <div>
      <div className="mb-1">
        <Button onClick={() => setIsShowModal(true)}>
          <Key size={13} className="mr-1 text-capitalize" /> Đổi mật khẩu
        </Button>
      </div>
      <Modal show={isShowModal} onClose={() => setIsShowModal(false)}>
        <Modal.Header>Đổi Mật Khẩu</Modal.Header>
        <Modal.Body>
          <form onSubmit={onChangePassword}>
            <div className="mb-2 block">
              <div className="mb-1 block">
                <Label htmlFor="OldPassword" value="Mật Khẩu Cũ" />
              </div>
              <TextInput
                type="password"
                name="OldPassword"
                required={true}
                placeholder="Mật khẩu cũ của bạn"
              />
            </div>
            <div className="mb-2 block">
              <div className="mb-1 block">
                <Label htmlFor="NewPassword" value="Mật Khẩu Mới" />
              </div>
              <TextInput
                type="password"
                name="NewPassword"
                required={true}
                placeholder="Mật khẩu mới của bạn"
              />
            </div>
            <div className="mb-2 block">
              <div className="mb-1 block">
                <Label htmlFor="ReNewPassword" value="Nhập Lại Mật Khẩu Mới" />
              </div>
              <TextInput
                type="password"
                name="ReNewPassword"
                required={true}
                placeholder="Nhập lại mật khẩu mới của bạn"
              />
            </div>
            <div className="flex gap-5 mt-6">
              <Button type="submit">
                {loading && (
                  <div className="mr-3">
                    <Spinner size="sm" light={true} />
                  </div>
                )}
                Apply
              </Button>
              <Button color="gray" onClick={() => setIsShowModal(false)}>
                Hủy
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="flex justify-between items-center mt-4">
        <h5 className="font-bold capitalize">Danh sách công việc</h5>
        <Link to="/posts/create">
          <Button>Thêm mới</Button>
        </Link>
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
              <Table.Cell>{post.User_Ref.Email}</Table.Cell>
              <Table.Cell>{post.JobType}</Table.Cell>
              <Table.Cell>{post.JobSalary} VNĐ</Table.Cell>
              <Table.Cell>{post.JobCareer}</Table.Cell>
              <Table.Cell>
                {post.Status === "draft" && "Chưa Duyệt"}
                {post.Status === "published" && "Đã Duyệt"}
                {post.Status === "deleted" && "Không Duyệt"}
              </Table.Cell>
              <Table.Cell>
                <button
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-3"
                  onClick={() => navigate(`/posts/update/${post._id}`)}
                >
                  Sửa
                </button>
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
