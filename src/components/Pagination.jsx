import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({
  totalItems,
  itemsPerPage,
  activePage,
  onPageChange,
  onSelectChange,
}) => {
  // 依資料總數計算有幾個頁面
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  // 建立頁碼 array，從 1 到總頁數
  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );

  // 取得項目屬性設定，例如按鈕外觀、點擊處理
  const getItemProps = (index) => ({
    ripple: false, // 取消點擊的漣漪效果
    variant: activePage === index ? "outlined" : "text",
    onClick: () => onPageChange(index), // 點擊時切換到對應頁面
    className: `rounded-full flex justify-center items-center ${
      activePage === index ? "bg-slate-800 text-white" : ""
    }`,
  });

  // 下一頁
  const handleNextPage = () => {
    if (activePage === totalPage) return; // 最後一頁就不執行操作
    onPageChange(activePage + 1);
  };

  // 上一頁
  const handlePrevPage = () => {
    if (activePage === 1) return; // 第一頁就不執行操作
    onPageChange(activePage - 1);
  };

  const renderPageNumbers = () => {
    if (totalPage <= 5) {
      return pageNumbers.map((pageNumber) => (
        <IconButton
          key={pageNumber}
          {...getItemProps(pageNumber)}
          disabled={activePage === pageNumber}
        >
          {pageNumber}
        </IconButton>
      ));
    }

    let displayedPages = [];
    if (activePage <= 2 || activePage >= totalPage - 1) {
      displayedPages = [1, 2, "...", totalPage - 1, totalPage];
    } else {
      displayedPages = [
        1,
        "...",
        activePage - 1,
        activePage,
        activePage + 1,
        "...",
        totalPage,
      ];
    }

    return displayedPages.map((pageNumber, index) => (
      <IconButton
        key={index}
        {...getItemProps(pageNumber)}
        disabled={pageNumber === "..." || activePage === pageNumber}
      >
        {pageNumber}
      </IconButton>
    ));
  };

  return (
    <div className="flex items-center gap-4">
      {/* 上一頁按鈕 */}
      <Button
        variant="text"
        className={`flex items-center gap-2 rounded-full ${
          activePage === 1 ? "opacity-60" : ""
        }
        }`}
        onClick={handlePrevPage}
        disabled={activePage === 1}
        ripple={false} // 取消點擊的漣漪效果
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        上一頁
      </Button>

      {/* 頁碼按鈕 */}
      <div className="h-4 flex items-center">{renderPageNumbers()}</div>

      {/* 下一頁按鈕 */}
      <Button
        variant="text"
        className={`flex items-center gap-2 rounded-full ${
          activePage === totalPage ? "opacity-60" : ""
        }
        }`}
        onClick={handleNextPage}
        disabled={activePage === totalPage}
      >
        下一頁
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>

      <select
        className="ml-7 border-2 border-slate-600 rounded-md focus:border-slate-600"
        value={itemsPerPage}
        onChange={onSelectChange}
      >
        <option value="10">10 / 頁</option>
        <option value="25">25 / 頁</option>
        <option value="50">50 / 頁</option>
        <option value="100">100 / 頁</option>
      </select>
    </div>
  );
};

export default Pagination;
