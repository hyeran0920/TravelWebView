import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommentComponent = () => {
    // 댓글 목록을 저장할 상태
    const [comments, setComments] = useState([]);
    // 작성 중인 댓글의 작성자 이름과 내용 상태
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const { contentTitle, placeName } = useParams();

    // 컴포넌트가 처음 마운트되었을 때 댓글 목록을 서버에서 불러옴
    useEffect(() => {
        fetchComments();
    }, []);

    // 댓글 목록을 불러오는 함수
    const fetchComments = () => {
        axios.get('/review/comments')
            .then(response => setComments(response.data))
            .catch(error => console.error('Error fetching comments:', error));
    };

    // 댓글 작성 후 서버에 전송하는 함수
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newComment = {
            name: name,
            content: content
        };

        try {
            const response = await axios.post('http://localhost:8080/review/comments', newComment);
            console.log('댓글이 성공적으로 저장되었습니다.');
            fetchComments(); // 새로운 댓글 저장 후 목록 갱신
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error);
        }
    };

    // 무작위로 RGB 색상을 생성하는 함수
    const getColorFromName = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const r = (hash >> 24) & 255;
        const g = (hash >> 16) & 255;
        const b = (hash >> 8) & 255;

        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg">
            {/* 댓글 작성 폼 */}
            <form onSubmit={handleSubmit} className="mb-6">
                <h2 className="mb-4 text-xl tracking-wider text-black">리뷰를 남겨주세요!</h2>
                <input
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm dark:bg-gray-900 dark:border-none focus:outline-none focus:border-blue-500 dark:text-gray-300"
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-sm resize-none dark:bg-gray-900 dark:border-none focus:outline-none focus:border-blue-500 dark:text-gray-300"
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    작성하기
                  </button>
                </div>
            </form>
            
            {/* 댓글 리스트를 보여주는 영역 */}
            <ul>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <li key={comment.id} className="p-4 mb-4 text-white bg-gray-800 rounded-lg shadow-md">
                            <div className="flex items-center mb-2">
                                <div className="flex-shrink-0">
                                    <span
                                        className="inline-flex items-center justify-center w-10 h-10 font-bold text-white rounded-full"
                                        style={{ backgroundColor: getColorFromName(comment.name) }}
                                    >
                                        {comment.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold">{comment.name}</p>
                                    <p className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                    {/* 콘텐츠 제목과 장소명 출력 */}
                                    <p className="text-sm text-gray-400">
                                        {contentTitle} - {placeName}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-200">{comment.content}</p>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">댓글이 없습니다.</li>
                )}
            </ul>
        </div>
    );
};

export default CommentComponent;