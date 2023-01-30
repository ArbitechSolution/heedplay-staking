import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

function Items({ currentItems, title }) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mt-5">
          <div className="card outbox w-100">
            <div className="card-body onebox">
              <h5 className="card-titleWith text-uppercase text-start ps-1">
                {title}
              </h5>
              <div className="row d-flex justify-content-center mt-2">
                <div className="col-md-2">
                  <div className=" text-level mb-2">No</div>
                </div>
                <div className="col-md-3">
                  <div className=" text-level mb-2">Address</div>
                </div>

                <div className="col-md-3">
                  <div className=" text-level mb-2">Total Deposit</div>
                </div>
                <div className="col-md-4">
                  <div className=" text-level mb-2">Generated Directs</div>
                </div>
              </div>
              {currentItems?.length != 0 ? (
                currentItems?.map((item, index) => {
                  return (
                    <div
                      className="row d-flex justify-content-center mt-1 mb-2"
                      key={index}
                    >
                      <div className="col-md-2">
                        <span className="text-details mb-2">{item?.index}</span>
                      </div>
                      <div className="col-md-3">
                        <span className="text-details mb-2">
                          {item?.address &&
                            item?.address.substring(0, 4) +
                              "..." +
                              item?.address.substring(item?.address.length - 4)}
                        </span>
                      </div>

                      <div className="col-md-3">
                        <div className=" text-details mb-2">
                          {item?.totalDeposit}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className=" text-details mb-2">
                          {item?.totalDirectAmount}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginatedItems({ itemsPerPage, directsDetail, title }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    let sliced;
    for (var i = 0; i < directsDetail?.length; i++) {
      sliced = directsDetail.slice(itemOffset, endOffset);
    }

    setCurrentItems(sliced);
    setPageCount(Math.ceil(directsDetail?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, directsDetail]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % directsDetail?.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} title={title} />
      <ReactPaginate
        nextLabel={<IoCaretForwardSharp />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
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
