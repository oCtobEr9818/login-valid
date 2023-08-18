import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ totalItems, itemsPerPage, activePage, onPageChange }) => {
  // 以資料總數計算有幾個頁面
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const getItemProps = (index) => ({
    ripple: false,
    variant: activePage === index ? "outlined" : "text",
    onClick: () => setActive(index),
    className: `rounded-full flex justify-center items-center ${
      activePage === index ? "bg-slate-800 text-white" : ""
    }`,
  });

  // 下一頁
  const next = () => {
    if (activePage === totalPages) return;
    onPageChange(activePage + 1);
  };

  // 上一頁
  const prev = () => {
    if (activePage === 1) return;
    onPageChange(activePage - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className={`flex items-center gap-2 rounded-full ${
          activePage === 1 ? "opacity-60" : ""
        }
        }`}
        onClick={prev}
        disabled={activePage === 1}
        ripple={false} // 取消點擊漣漪效果
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        上一頁
      </Button>

      <div className="h-4 flex items-center">
        {pageNumbers.map((pageNember) => (
          <IconButton
            key={pageNember}
            {...getItemProps(pageNember)}
            disabled={activePage === pageNember}
          >
            {pageNember}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className={`flex items-center gap-2 rounded-full ${
          activePage === totalPages ? "opacity-60" : ""
        }
        }`}
        onClick={next}
        disabled={activePage === totalPages}
      >
        下一頁
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
