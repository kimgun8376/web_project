/* Flexbox를 사용하여 전체 페이지 중앙 정렬 */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    
  }
  .property-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  .single-property {
    flex: 1;
    max-width: 30%;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow:hidden ;
    box-shadow: 0 4px 8px rgba(0,0,0, 0.1);
    transition: transform 0.3s ease;
    margin-bottom: 20px;
  }
   .single-property:hover {
    transform: scale(1.05);
   }

   .main-image {
    padding: 10px;
   }
   .main-image img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .main-content {
    padding: 20px;
    text-align: left;
  }

  .category {
    font-weight: bold;
    color: #333;
    font-size: 18px;
    margin-bottom: 10px;
  }

  h4 {
    margin: 10px 0;
    font-size: 22px;
    color: #222;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 16px;
  }

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .property-list {
      flex-direction: column;
      align-items: center;
    }

    .single-property {
      max-width: 80%; /* 모바일에서 각 항목의 너비를 크게 설정 */
    }
  }

  