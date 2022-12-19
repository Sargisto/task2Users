import "../styles/pagination.css";

export const Pagination = ({ pageCount, setPage, pageId }) => {
    return (
        <>
            <div className="pagination">
                <span onClick={() => setPage(1)}>&laquo;</span>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((num, i) => {
                    return (
                        <span
                            key={num}
                            onClick={() => setPage(num)}
                            className={pageId === num ? "active" : ""}
                        >
                            {num}
                        </span>
                    );
                })}
                <span onClick={() => setPage(pageCount)}>&raquo;</span>
            </div>
        </>
    )
}