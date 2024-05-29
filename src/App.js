import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const App = () => {
    var [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    // const [category, setCategory] = useState("");
    const [inputSearch, setInputSearch] = useState("");
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
    // const toPascalCase = (text) => {
    //     let capText = text.slice(0, 1).toUpperCase();
    //     let smallText = text.slice(1);
    //     let fullText = capText + smallText;
    //     console.log(fullText);
    //     setCategory("ggggg");
    // };

    // select and option price sorting
    const sortSelect = () => {
        const selectedOption = document.getElementById("sort").value;
        let sortedData;

        switch (selectedOption) {
            case "all":
                setData(originalData);
                setPageNumber(0);
                break;
            case "beauty":
                sortedData = originalData.filter((item) => item.category === "beauty");
                setData(sortedData);
                setPageNumber(0);
                break;
            case "fragrances":
                sortedData = originalData.filter((item) => item.category === "fragrances");
                setData(sortedData);
                setPageNumber(0);
                break;
            case "furniture":
                sortedData = originalData.filter((item) => item.category === "furniture");
                setData(sortedData);
                setPageNumber(0);
                break;
            case "groceries":
                sortedData = originalData.filter((item) => item.category === "groceries");
                setData(sortedData);
                setPageNumber(0);
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
            case "all":
                setData(originalData);
                setPageNumber(0);
                break;
            case "first":
                sortedData = originalData.filter((item) => item.price <= 1000);
                setData(sortedData);
                setPageNumber(0);
                break;
            case "second":
                sortedData = originalData.filter((item) => item.price <= 2000 && item.price >= 1000);
                setData(sortedData);
                setPageNumber(0);
                break;
            case "third":
                sortedData = originalData.filter((item) => item.price >= 2000);
                setData(sortedData);
                setPageNumber(0);
                break;
            default:
                sortedData = originalData;
                setPageNumber(0);
        }
    };

    // input price search sorting
    const inputPriceSearch = () => {
        const inputPrice = document.getElementById("inputPrice").value;
        const inputPriceNumber = Number(inputPrice);
        let sortedData;
        if (inputPriceNumber) {
            sortedData = originalData.filter((item) => item.price <= inputPriceNumber);
            setData(sortedData);

            setInputSearch(inputPriceNumber);
            setPageNumber(0);
        } else {
            setData(originalData);
            setPageNumber(0);
        }
    };
    useEffect(() => {
        getApi();
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="text-center m-4">DummyJSON AXIOS GET API</h1>
                <div className="row">
                    <div className="p-2 fw-bold text-end">
                        <input type="text" placeholder="Enter Price To Search" id="inputPrice" value={inputSearch} onChange={inputPriceSearch} className="w-25 me-3 px-2 py-1" />
                        <input type="radio" id="all" name="fav_language" className="radio" onClick={() => radioSelect(0)} value="all" defaultChecked />
                        <label htmlFor="all" className="ms-2">
                            ALL
                        </label>
                        <input type="radio" id="first" name="fav_language" className="ms-3 radio" onClick={() => radioSelect(1)} value="first" />
                        <label htmlFor="first" className="ms-2">
                            &lt; 1000
                        </label>
                        <input type="radio" id="second" name="fav_language" className="ms-3 radio" onClick={() => radioSelect(2)} value="second" />
                        <label htmlFor="second" className="ms-2">
                            1000-2000
                        </label>
                        <input type="radio" id="third" name="fav_language" className="ms-3 radio" onClick={() => radioSelect(3)} value="third" />
                        <label htmlFor="third" className="ms-2">
                            &gt; 2000
                        </label>
                    </div>
                    <table className="table table-success table-striped-columns table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">TITLE</th>
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
                            {displayProducts?.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <th scope="row">{val.id}</th>
                                        <td className="w-50">{val.title}</td>
                                        <td className="w-25">{val.category}</td>
                                        {/* <td>
                                            {() => toPascalCase(val.category)}
                                            {category}
                                        </td> */}
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
