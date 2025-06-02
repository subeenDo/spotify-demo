import React, { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import LoadingSpinner from './common/components/loadingSpinner/loadingSpinner';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchWithKeyword/SearchWithKeywordPage'));
const PlayListDetailPage = React.lazy(() => import('./pages/PlayListDetailPage/PlayListDetailPage'));
const PlayListPage = React.lazy(() => import('./pages/PlayListPage/PlayListPage'));

// 0. 사이드바 있어야 함( 플레이리스트, 메뉴) 웹-세로 /  모바일-하단 가로
// 1. 홈페이지 (랜딩 페이지) /
// 2. 검색 페이지 (search) /search
// 3. 검색 결과 페이지 /search/ : keyword
// 4. 플레이리스트 디테일 페이지 /playlist/ : id
// 4-1. 모바일 플레이리스트 페이지 /playlist

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithKeywordPage />} />
          <Route path='playlist/:id' element={<PlayListDetailPage />} />
          <Route path='playlist' element={<PlayListPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}


export default App;

