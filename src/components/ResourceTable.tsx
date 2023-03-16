
const ResourceTable = () => {
    const ResourceEntry = () => {
        return (
            <tr>
                <td>
                    test
                </td>
                <td>
                    test
                </td>
            </tr>
        )
    }

    return(
    <div className="px-4 w-full">
        <table className="table-fixed w-full bg-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-neutral-800 rounded-xl overflow-hidden">
                <tr>
                    <th>
                        <span className="text-white block px-4 py-2 text-left">
                            Resource
                        </span>
                    </th>
                    <th>
                        <span className="text-white block px-4 py-2 text-left">
                            Description
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y-[1px] divide-slate-300">
                <ResourceEntry />
                <ResourceEntry />
            </tbody>
        </table>
    </div>
    );
};

export default ResourceTable;
