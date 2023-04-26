import styled from "styled-components";

export const Calculator_style = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(4, 58.5px);
  grid-template-rows: 73px repeat(5, 28px);
  gap: 5px 8px;
  > :nth-child(2) {
    margin-bottom: 9px;
  }

  div.title {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    color: #66546c;
    font-family: "Noto Sans TC";
    font-weight: 700;
    letter-spacing: 0.09em;
    font-size: 1rem;
    width: 119px;
    height: 33px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #eaeaea;
    border-radius: 20px;
    box-shadow: 0px 2px 6px rgba(185, 169, 129, 0.53);
  }

  button {
    margin: 0;
    outline: none;

    background: #fdfbf8;
    color: #717171;
    filter: drop-shadow(0px 4px 7px #e9e4dc);
    border: none;
    border-radius: 8px;

    font-family: "Dangrek";
    font-size: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.025em;
    transition: all 0.1s ease;

    cursor: pointer;
    &:hover {
      transform: translateY(-8%);
    }
    &:active {
      transform: translateY(8%);
    }
  }
  button.span-two {
    grid-column: span 2;
  }
  .output {
    grid-column: 1/-1;
    position: relative;
    background: #d8ccb8;
    box-shadow: inset 2px 3px 13px rgba(0, 0, 0, 0.25);
    border-radius: 11px;

    text-align: end;
    padding-right: 19px;

    font-family: "Dangrek";
    color: #ffffff;
    letter-spacing: 0.025em;
    line-height: 150.52%;

    display: flex;
    flex-direction: column;
    align-items: end;

    .previous-operand {
      position: absolute;
      height: 15px;
      top: 0.75rem;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
    }
    .current-operand {
      position: absolute;
      height: 25px;
      bottom: 0.75rem;
      font-size: 1.5rem;
      display: flex;
      align-items: end;
    }
  }
`;
