import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const App = () => {
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState();
    const [inputTitle, setInputTitle] = useState("");
    const [category, setCategory] = useState("all");
    const [pageNumber, setPageNumber] = useState(0);
    const pagePerProduct = 10;
    const visitedPage = pageNumber * pagePerProduct;
    const displayProducts = data.slice(visitedPage, visitedPage + pagePerProduct);
    const countPage = Math.ceil(data.length / pagePerProduct);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    // GET DATA API
    const getApi = () => {
        axios
            .get("https://dummyjson.com/products")
            .then((res) => {
                setData(res.data.products);
                setOriginalData(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // select and option price sorting
    const sortSelect = () => {
        const selectedOption = document.getElementById("sort").value;
        let sortedData;
        switch (selectedOption) {
            case "all":
                setData(originalData);
                setPageNumber(0);
                setCategory("all");
                break;
            case "beauty":
                sortedData = originalData.filter((item) => item.category === "beauty");
                setData(sortedData);
                setPageNumber(0);
                setCategory("beauty");
                break;
            case "fragrances":
                sortedData = originalData.filter((item) => item.category === "fragrances");
                setData(sortedData);
                setPageNumber(0);
                setCategory("fragrances");
                break;
            case "furniture":
                sortedData = originalData.filter((item) => item.category === "furniture");
                setData(sortedData);
                setPageNumber(0);
                setCategory("furniture");
                break;
            case "groceries":
                sortedData = originalData.filter((item) => item.category === "groceries");
                setData(sortedData);
                setPageNumber(0);
                setCategory("groceries");
                break;
            default:
                sortedData = originalData;
                setPageNumber(0);
        }
    };

    //price range sorting
    const radioSelect = (data) => {
        const selectedOption = document.getElementsByName("fav_language")[data].value;
        let sortedData;
        switch (selectedOption) {
            case "allc":
                setData(originalData);
                document.getElementById("sort").value = "all";
                setPageNumber(0);
                break;
            case "all":
                sortedData = originalData.filter((item) => item.category.toLowerCase() === category.toLowerCase());
                setData(sortedData);
                setPageNumber(0);
                break;
            case "first":
                if (category === "all") {
                    sortedData = originalData.filter((item) => item.price <= 1000);
                } else {
                    sortedData = originalData?.filter((item) => item.category.toLowerCase() === category.toLowerCase()).filter((item) => item.price <= 1000);
                }
                setData(sortedData);
                setPageNumber(0);
                break;
            case "second":
                if (category === "all") {
                    sortedData = originalData.filter((item) => item.price <= 2000 && item.price >= 1000);
                } else {
                    sortedData = originalData?.filter((item) => item.category.toLowerCase() === category.toLowerCase()).filter((item) => item.price <= 2000 && item.price >= 1000);
                }
                setData(sortedData);
                setPageNumber(0);
                break;
            case "third":
                if (category === "all") {
                    sortedData = originalData.filter((item) => item.price >= 2000);
                } else {
                    sortedData = originalData?.filter((item) => item.category.toLowerCase() === category.toLowerCase()).filter((item) => item.price >= 2000);
                }
                setData(sortedData);
                setPageNumber(0);
                break;
            default:
                sortedData = originalData;
                setPageNumber(0);
        }
    };

    const inputPriceSearch = (e) => {
        const inputPrice = e.target.value;
        if (inputPrice === "") {
            setInputSearch("");
            setData(originalData);
        } else {
            const inputPriceNumber = Number(inputPrice);
            setInputSearch(inputPriceNumber);
            const sortedData = originalData.filter((item) => item.price <= inputPriceNumber);
            setData(sortedData);
        }
        setPageNumber(0);
    };
    useEffect(() => {
        getApi();
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="text-center p-4 text-white">DummyJSON AXIOS GET API</h1>
                <div className="row">
                    <div className="p-2 fw-bold text-white mb-3">
                        <label htmlFor="inputTitleSearch">Enter Title To Search :</label>
                        <input
                            type="text"
                            placeholder="Enter Title To Search"
                            id="inputTitleSearch"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                            className="me-3 px-2 py-1 ms-2"
                        />
                        <label htmlFor="inputPrice">Enter Price To Search :</label>
                        <input
                            type="text"
                            placeholder="Enter Price To Search"
                            id="inputPrice"
                            value={inputSearch === 0 ? "" : inputSearch}
                            onChange={inputPriceSearch}
                            className="me-3 px-2 py-1 ms-2"
                        />
                        <div className="float-end d-inline-block">
                            <input type="radio" id="allc" name="fav_language" className="radio ms-3" onClick={() => radioSelect(0)} value="allc" defaultChecked />
                            <label htmlFor="allc" className="ms-2" defaultChecked>
                                ALL Category
                            </label>
                            <input type="radio" id="all" name="fav_language" className="radio ms-3" onClick={() => radioSelect(1)} value="all" />
                            <label htmlFor="all" className="ms-2">
                                ALL
                            </label>
                            <input type="radio" id="first" name="fav_language" className="ms-3 radio" onClick={() => radioSelect(2)} value="first" />
                            <label htmlFor="first" className="ms-2">
                                &lt; 1000
                            </label>
                            <input type="radio" id="second" name="fav_language" className="ms-3 radio" onClick={() => radioSelect(3)} value="second" />
                            <label htmlFor="second" className="ms-2">
                                1000-2000
                            </label>
                            <input type="radio" id="third" name="fav_language" className="ms-3 radio" onClick={() => radioSelect(4)} value="third" />
                            <label htmlFor="third" className="ms-2">
                                &gt; 2000
                            </label>
                        </div>
                    </div>
                    <table className="table table-success table-striped-columns table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">TITLE</th>
                                <th scope="col">IMAGE</th>
                                <th scope="col">
                                    CATEGORY
                                    <select name="sort" id="sort" onChange={sortSelect} className="ms-2 border-0 fw-bold px-2 rounded">
                                        <option value="all">ALL</option>
                                        <option value="beauty">Beauty</option>
                                        <option value="fragrances">Fragrances</option>
                                        <option value="furniture">Furniture</option>
                                        <option value="groceries">Groceries</option>
                                    </select>
                                </th>
                                <th scope="col">PRICE ($)</th>
                                <th scope="col">RATING</th>
                                <th scope="col">STOCK</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider align-middle">
                            {(inputTitle === ""
                                ? displayProducts
                                : data.filter((item) => {
                                      if (item.title.toLowerCase().includes(inputTitle.toLowerCase())) {
                                          return item;
                                      } else {
                                          return null;
                                      }
                                  })
                            )?.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <th scope="row">{val.id}</th>
                                        <td className="w-25">{val.title}</td>
                                        <td className="w-25">
                                            <img src={val.images[0]} width={100} alt={val.title} />
                                        </td>
                                        <td className="w-25">{val.category}</td>
                                        <td>{val.price}</td>
                                        <td>{val.rating}</td>
                                        <td>{val.stock}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="">
                    <ReactPaginate pageCount={countPage} onPageChange={changePage} containerClassName="paginationBttns"></ReactPaginate>
                </div>
            </div>
        </>
    );
};
export default App;
