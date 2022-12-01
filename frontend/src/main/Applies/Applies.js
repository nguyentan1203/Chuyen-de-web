import { Button, Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { timeSince } from "../../core/commonFuncs";

export default function Applies({ items, onSelect }) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {items.map((item) => (
        <div key={item._id}>
          <Card>
            <div>
              {/* <img
            src="/demo.png"
            alt=""
            className="object-cover w-24 h-24"
          /> */}
              <div className="ml-4">
                <Link to={`/detail/${item._id}`} className="capitalize">
                  <h4 className="text-lg font-bold tracking-tight text-blue-600 uppercase">
                    {item.Title}
                  </h4>
                </Link>
                {/* <h5 className="tracking-tight text-gray-900 uppercase">
                Công ty tài chính TNHH HD SAISON
              </h5> */}
                {/* <p className="flex items-center tracking-tight text-gray-900">
                <Navigation2 size={12} className="mr-1" /> Thái Bình: Đông
                Hưng, Vũ Thư, Thái Bình
              </p> */}
                <p className="flex items-center font-bold tracking-tight text-gray-900">
                  {Number(item.JobSalary).toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p
                  className="font-normal text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{
                    __html: item.Content.slice(0, 300),
                  }}
                />
                <div className="flex justify-between">
                  <p className="flex items-center tracking-tight text-gray-900 mt-2">
                    {timeSince(new Date(item.created_at))}
                    {/* <a href="" className="ml-2 text-blue-600">
                  xem thêm...
                </a> */}
                  </p>
                  <div className="mt-2">
                    <Button onClick={() => onSelect(item._id)}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
