import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DocDetail = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState();
    const handleVersionChange = (event) => {
        const selectedDocument = documents.find((doc) => doc.version === event.target.value);
        setSelectedVersion(selectedDocument);
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/document/${id}`);
            let { versions } = data;
            versions = versions.map((version) => {
                const ret = {
                    id: data.id,
                    title: data.name,
                    description: data.description,
                    version: version.name,
                    time: version.updateTime,
                    file: version.url,
                    department: data.department.name,
                    currentVersion: version.currentVersion,
                };
                if (version.currentVersion) {
                    setSelectedVersion(ret);
                }
                return ret;
            })
            setDocuments(versions);
            setIsLoading(false);
        };
        fetchDocuments();
    }, [id]);

    return (
        <div className="pt-6 container">
            <h1 className="text-4xl font-bold mb-4 text-blue-400 text-center">Document Detail</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <><div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Select Version:</label>
                    <select className="border border-gray-300 p-2 rounded-md w-full" onChange={handleVersionChange}>
                        {documents.map((doc) => (
                            <option key={doc.version} value={doc.version}>
                                Version {doc.version} - {doc.time}
                            </option>
                        ))}
                    </select>
                </div>
                    <div className="shadow-md p-5 rounded-md bg-white">
                        {selectedVersion ? (
                            <div className="flex flex-col gap-4">
                                <h2 className="text-xl font-bold mb-2 text-blue-400">Title: {selectedVersion.title}</h2>
                                <h4 className="text-md font-bold mb-2 text-blue-400">Document ID: {selectedVersion.id}</h4>
                                <div className="mb-2">Created Time: {selectedVersion.time}</div>
                                <div className="mb-2">File: <a href={selectedVersion.file} download className="text-blue-500">{selectedVersion.file}</a></div>
                                <div className="mb-2">Description:</div>
                                <div className="mb-2">{selectedVersion.description}</div>
                                <div className="mb-2">Department: {selectedVersion.department}</div>
                            </div>
                        ) : (
                            <div className="text-center">No versions found</div>
                        )}
                    </div></>
            )}
        </div>
    );
};
