import { useParams } from "react-router-dom";
import { apiGetGameDetail } from "../components/api/api";
import { useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";

import {
  defaultGameResult,
  GameResult,
  platformIcons,
  platformBorderColors,
} from "../types/types";
import styled from "styled-components";
import Loader from "../components/common/Loader";
<<<<<<< Updated upstream
=======
import SteamPrice from "../components/api/SteamPrice";
import SimpleSlider from "../components/common/Slick";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../components/auth/store/userInfo";
import axios from "axios";
import { getCurrentUser } from "../components/auth/helper/storage";
import {
  ContentContainer,
  GameAbout,
  AboutBetween,
  WhiteLine,
} from "../style/GameDetail.styles";
import {
  apiAddGameCart,
  apiAddGameLike,
  apiAddGameReviews,
  apiCheckGameCart,
  apiCheckGameLike,
  apiGetGameReviews,
} from "../components/api/backApi";
>>>>>>> Stashed changes

// 본문 컨테이너 영역 (dominant_color를 연하게 배경으로 사용)
const ContentContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) =>
    `${bgColor}20`}; // 연한 배경색 (투명도 적용)
  border-radius: 12px;

  @media (max-width: 768px) {
    font-size: 0.875rem; // 줄이고 싶다면 여기 유지
  }

  @media (max-width: 468px) {
    font-size: 0.7em;
    max-height: 180px;
  }
`;

// About 영역 스타일 (styled-components 활용)
const GameAbout = styled.div`
  margin: 5% 5%;
  max-height: 220px;
  overflow-y: auto;

  h2 {
    @media (max-width: 768px) {
      font-size: 1.5rem; // 줄이고 싶다면 여기 유지
    }

    @media (max-width: 468px) {
      font-size: 1.3em;
    }
  }
`;

const TextHidden = styled.div`
  display: block;
`;

// GameDetail 컴포넌트
const GameDetail = () => {
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // URL 파라미터에서 game id 추출
  const params = useParams();
  const { id } = params;

<<<<<<< Updated upstream
  // 게임 상세 정보 상태 초기화
  const [gameDetail, setGameDetail] = useState<GameResult>(defaultGameResult);

  // 컴포넌트 mount 시 상세정보 호출
=======
    const data = await apiGetGameReviews(id);
    if (data) {
      setReviews(data);
      if (userInfo.username) {
        const myReview = data.find(
          (rev: { userName: string }) => rev.userName === userInfo.username
        );
        if (myReview) {
          setReviewText(myReview.content);
          setRating(myReview.rating);
        }
      }
    }
  };
  // 찜, 위시리스트
  const [cartActive, setCartActive] = useState(false);
  const [likeActive, setLikeActive] = useState(false);

  // 상세 정보 및 이미지 요청
  const fetchGameDetail = async () => {
    if (!id) return;
    setIsLoading(true);

    try {
      const resImg = await apiGetGameImg(id);
      setGameImg(resImg);

      const res = await apiGetGameDetail(id);
      setGameDetail(res); // ← 이게 먼저 실행돼야 함

      // ✅ gameDetail 설정 후에 찜/카트 상태 체크
      if (userInfo?.username) {
        await CheckLikeAndCartStatus(res); // res는 GameResult
      }
    } catch (error) {
      console.error("게임 정보 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 가격 정보 수신 핸들러
  const handlePriceFetch = (numeric: number, formatted: string) => {
    setPriceValue(numeric);
    setPriceText(formatted);
  };

  // 리뷰 등록
  const submitReview = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }
    if (rating === 0 || reviewText.trim() === "") {
      alert("평점과 리뷰를 모두 입력해 주세요.");
      return;
    }
    const reviewData = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      rating,
      content: reviewText,
    };
    try {
      const response = await apiAddGameReviews(reviewData); // API 호출
      alert(response);
      // 리뷰 목록 반영
      setReviews([
        ...reviews,
        {
          userName: userInfo.username,
          rating,
          content: reviewText,
          updatedAt: new Date().toISOString(),
        },
      ]);
      setRating(0);
      setReviewText("");
      await fetchReviewList(); // 리뷰 목록 다시 불러오기
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  // 장바구니 저장 요청
  const cartSave = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }
    const cartData = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      title: gameDetail.name,
      backgroundImage: gameDetail.background_image,
      price: priceValue,
      salePrice: 0,
    };
    try {
      const response = await apiAddGameCart(cartData);
      // 문자열 앞 SUCCESS 및 ERROR 자르고 배열의 두 요소를 각각 변수에 담음
      const [status, message] = response
        // 문자열을 ":" 기준으로 분리합니다.
        .split(":")
        // 배열의 각 요소에 대해 trim()을 적용해서 앞뒤 공백 제거
        .map((s: string) => s.trim());

      if (status === "SUCCESS") {
        alert(message); // 성공 메세지
        setCartActive((prev) => !prev);
      } else {
        alert("에러: " + message);
      }
    } catch (error) {
      console.error("찜 오류", error);
      alert("찜 목록 등록 중 오류가 발생했습니다.");
    }
  };

  // 찜 저장 요청
  const likeSave = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }

    const likeData = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      title: gameDetail.name,
      backgroundImage: gameDetail.background_image,
      price: priceValue,
      salePrice: 0,
    };
    try {
      const response = await apiAddGameLike(likeData); // e.g. "SUCCESS: 찜이 취소되었습니다."
      // 문자열 앞 SUCCESS 및 ERROR 자르고 배열의 두 요소를 각각 변수에 담음
      const [status, message] = response
        // 문자열을 ":" 기준으로 분리합니다.
        .split(":")
        // 배열의 각 요소에 대해 trim()을 적용해서 앞뒤 공백 제거
        .map((s: string) => s.trim());

      if (status === "SUCCESS") {
        alert(message); // "찜이 취소되었습니다." 등
        setLikeActive((prev) => !prev);
      } else {
        alert("에러: " + message); // "에러: 중복 등록" 등
      }
    } catch (error) {
      console.error("찜 오류", error);
      alert("찜 목록 등록 중 오류가 발생했습니다.");
    }
  };

  const CheckLikeAndCartStatus = async (game: GameResult) => {
    if (!userInfo.username || !game?.id) return;
    try {
      const likeRes = await apiCheckGameLike(userInfo.username, game.id);
      const cartRes = await apiCheckGameCart(userInfo.username, game.id);
      setLikeActive(Boolean(likeRes));
      setCartActive(Boolean(cartRes));
    } catch (error) {
      console.error("찜/장바구니 상태 확인 중 오류: ", error);
    }
  };

  // 상태변경시 값 호출
>>>>>>> Stashed changes
  useEffect(() => {
    GetGameDetail();
  }, []);

  // 상세정보 API 호출 함수
  const GetGameDetail = () => {
    setIsLoading(true); // 로딩 시작
    if (id) {
      apiGetGameDetail(id)
        .then((res) => {
          setGameDetail(res);
          console.log(res); // 디버깅용 콘솔
        })
        .finally(() => setIsLoading(false)); // 로딩 종료
    }
  };

  return (
    <>
      {/* 로딩 중일 때 Loader 표시 */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 w-full min-h-screen bg-black text-white flex justify-center">
          {/* 본문 영역 전체 */}
          <div className="max-w-[80%] mx-auto w-full">
            {/* 상단 헤더 이미지 영역 */}
            <div
              className="w-full h-[250px] bg-cover bg-center"
              style={{ backgroundImage: `url(${gameDetail.background_image})` }}
            >
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <h2 className="text-5xl font-bold">{gameDetail.name}</h2>
              </div>
            </div>

            {/* 본문 내용 - dominant_color 적용 */}
            <ContentContainer bgColor={gameDetail.dominant_color}>
              {/* 좋아요 및 장바구니 버튼 */}
              <div className="flex flex-col items-center my-10">
                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-bold text-white">
                    ❤️ 좋아요
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-bold text-white">
                    🛒 장바구니
                  </button>
                </div>
              </div>

              {/* About 영역 (HTML description 파싱 출력) */}
              <GameAbout>
                <h2 className="text-2xl font-bold mb-2">About</h2>
                <TextHidden>
                  <p
                    dangerouslySetInnerHTML={{ __html: gameDetail.description }}
                  ></p>
                </TextHidden>
              </GameAbout>

              {/* 상세 정보 영역 (2열 테이블 형태) */}
              <div className="grid grid-cols-2 gap-y-4 text-sm max-w-4xl mx-auto">
                <div className="font-bold text-gray-400">출시일</div>
                <div>{gameDetail.released}</div>

<<<<<<< Updated upstream
                <div className="font-bold text-gray-400">평점</div>
                <div>
                  {gameDetail.rating} / {gameDetail.rating_top}
=======
                  <div className="font-bold text-gray-400">출시일</div>
                  <div>{gameDetail.released}</div>

                  <div className="font-bold text-gray-400">평점</div>
                  <div>
                    {gameDetail.rating} / {gameDetail.rating_top}
                  </div>

                  <div className="font-bold text-gray-400">메타크리틱</div>
                  <div>{gameDetail.metacritic ?? "없음"}</div>

                  <div className="font-bold text-gray-400">플레이타임</div>
                  <div>{gameDetail.playtime}시간</div>

                  <div className="font-bold text-gray-400">장르</div>
                  <div>{gameDetail.genres.map((g) => g.name).join(", ")}</div>

                  <div className="font-bold text-gray-400">플랫폼</div>
                  <div className="flex gap-1 flex-wrap">
                    {gameDetail.parent_platforms.map((p) => {
                      const slug = p.platform.slug;
                      const platformName = platformIcons[slug];
                      if (!platformName) return null;
                      return (
                        <span
                          key={slug}
                          className="inline-block text-[11px] font-semibold px-2 rounded border"
                          style={{
                            border: `1px solid ${
                              platformBorderColors[slug] || "#ccc"
                            }`,
                            color: "#fff",
                            height: "20px",
                            lineHeight: "20px",
                            verticalAlign: "middle",
                          }}
                        >
                          {platformName}
                        </span>
                      );
                    })}
                  </div>

                  {/* 장바구니 & 위시리스트 버튼 */}
                  <div className="my-2 text-center">
                    <div className="inline-block whitespace-nowrap">
                      <button
                        onClick={cartSave}
                        className="group hover:bg-black-700 text-white font-bold py-2 px-5 rounded shadow mr-2"
                      >
                        <div>
                          <BsFillCartCheckFill
                            className={`text-2xl w-20 group-hover:text-green-500 transition-colors duration-200 ${
                              cartActive ? "text-green-500" : "text-white"
                            }`}
                          />
                        </div>
                      </button>
                      <button
                        onClick={likeSave}
                        className="group hover:bg-black-700 text-white font-bold py-2 px-5 rounded shadow mr-2"
                      >
                        <div>
                          <AiFillLike
                            className={`text-2xl w-20 group-hover:text-red-500 transition-colors duration-200 ${
                              likeActive ? "text-red-500" : "text-white"
                            }`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </WhiteLine>
              </AboutBetween>

              {/* 리뷰 영역 */}
              <div className="max-w-4xl mx-auto mt-12 p-4 bg-white/5 rounded-xl">
                <div className="font-bold text-lg text-gray-300 mb-3">
                  리뷰 남기기
>>>>>>> Stashed changes
                </div>

                <div className="font-bold text-gray-400">메타크리틱</div>
                <div>{gameDetail.metacritic ?? "없음"}</div>

                <div className="font-bold text-gray-400">플레이타임</div>
                <div>{gameDetail.playtime}시간</div>

                <div className="font-bold text-gray-400">장르</div>
                <div>{gameDetail.genres.map((g) => g.name).join(", ")}</div>

                <div className="font-bold text-gray-400">플랫폼</div>
                {/* 플랫폼에 약어 + 색상 적용 */}
                <div className="flex gap-1 flex-wrap">
                  {gameDetail.parent_platforms.map((p) => {
                    const slug = p.platform.slug;
                    const platformName = platformIcons[slug];
                    if (!platformName) return null; // 등록되지 않은 slug는 제외
                    return (
                      <span
                        key={slug}
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{
                          border: `1px solid ${
                            platformBorderColors[slug] || "#ccc"
                          }`,
                          color: "#fff",
                        }}
                      >
                        {platformName}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 구매 스토어 영역 */}
              <div className="max-w-4xl mx-auto mt-8">
                <div className="font-bold text-gray-400 mb-2">구매 스토어</div>
                <div className="flex flex-wrap gap-3">
                  {gameDetail.stores.map((s, idx) => (
                    <a
                      key={idx}
                      href={`https://${s.store.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white transition-colors"
                    >
                      {s.store.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* 태그 영역 */}
              <div className="max-w-4xl mx-auto mt-8 text-sm sm:text-base md:text-lg hidden sm:block">
                <div className="font-bold text-gray-400 mb-2">태그</div>
                <div className="flex flex-wrap gap-2">
                  {gameDetail.tags.slice(0, 20).map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 px-3 py-1 rounded-full text-sm"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </ContentContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetail;
