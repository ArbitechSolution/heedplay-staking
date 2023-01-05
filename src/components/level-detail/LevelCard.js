import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

const array = [
  { title: "Common", id: "#1001",  },
  { title: "Uncommon", id: "#1002", },
  { title: "Rare", id: "#1003", },
  { title: "Epic", id: "#1004",  },
  { title: "Legendary", id: "#1005",  },
  { title: "My Thic", id: "#1006",  },
  { title: "Common", id: "#1001",},
  { title: "Uncommon", id: "#1002",  },
  { title: "Rare", id: "#1003",  },
];
const items = [...array];

function Items({ currentItems }) {

  return (
<div className="container">
    <div className="row d-flex justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox w-100">
            <div className="card-body onebox">
              <h5 className="card-title text-uppercase">Level Detail</h5>
              <div className="row d-flex justify-content-center mt-5 mb-3">
              <div className="col-md-2">
              <div className=" text-level mb-2">
                No
              </div>
              </div>
              <div className="col-md-4">
              <div className=" text-level mb-2">
                Address
              </div>
              </div>
              <div className="col-md-4">
              <div className=" text-level mb-2">
              Deposit
              </div>
              </div>
              </div>
              <div className="row d-flex justify-content-center mt-5 mb-3">
              <div className="col-md-2">
              <div className=" text-level mb-2">
                No
              </div>
              </div>
              <div className="col-md-4">
              <div className=" text-level mb-2">
                Address
              </div>
              </div>
              <div className="col-md-4">
              <div className=" text-level mb-2">
              Deposit
              </div>
              </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    //   {currentItems &&
    //     currentItems.map((item) => (
    //       <div className="col-xl-4 col-lg-6 col-sm-12 col-md-12 d-flex justify-content-center">
    //         <div className="row d-flex justify-content-center">
    //           <div className="col-10 col-md-10 col-lg-10 pic-bg-nft ">
    //             {/* <img
    //               src={item.pic}
    //               className="img-fluid mt-2 rounded mobileNftTransfer"
    //               alt=""
    //             /> */}
    //           </div>
    //           <div className="col-10 col-md-10 col-lg-10 d-flex justify-content-center mt-4">
    //             <span className="text-uppercase nftImgTitle ">
    //               {item.title}
    //             </span>
    //           </div>
    //           <div className="col-10 col-md-10 col-lg-10 d-flex justify-content-center mt-2">
    //             {item.id}
    //           </div>
    //         </div>
    //       </div>
    //     ))}
  );
}

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    let sliced;
    for (var i = 0; i < items.length; i++) {
      sliced = items.slice(itemOffset, endOffset);
    }

    setCurrentItems(sliced);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel={<IoCaretForwardSharp />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<IoCaretBackSharp />}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item page-item2"
        previousLinkClassName="page-link arrow"
        nextClassName="page-item page-item2"
        nextLinkClassName="page-link arrow"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
