import React from "react";
import styles from "./FlipBook.module.css";
import HTMLFlipBook from "react-pageflip";

import img1 from "../../images/puzzle_test_1.jpg";

import { BookWrapper, Container } from "./FilpBook.elements";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div
      className={props.number % 2 == 0 ? styles.page1 : styles.page2}
      ref={ref}
    >
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image"></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

export default class FlipBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_state: "none",
      user_orientation: "none",
      page: 0,
      totalPage: 0,
      counter_sizing: 0,
    };
  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  };

  onPage = (e) => {
    console.log(e);
    this.setState({
      page: e.data,
    });
  };

  componentDidMount() {
    this.setState({
      totalPage: this.flipBook.getPageFlip().getPageCount(),
      user_orientation: this.flipBook.getPageFlip().getOrientation(),
    });
  }

  bookResizing = () => {
    let counter = this.state.counter_sizing;
    this.setState({
      counter_sizing: counter + 1,
    });
  };

  onChangeState = (e) => {
    this.setState({
      user_state: e.data,
    });
  };

  onChangeOrientation = (e) => {
    console.log("change orientation");
    this.setState({
      user_orientation: e.data,
    });
  };

  render() {
    window.addEventListener("resize", this.bookResizing);
    console.log("re-render");
    console.log(this.state.counter_sizing);
    return (
      <Container>
        <BookWrapper>
          <HTMLFlipBook
            width={550}
            height={733}
            minWidth={215}
            minHeight={300}
            maxWidth={1000}
            maxHeight={1533}
            size="stretch"
            // maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className={styles.demobook}
            // usePortrait={true}
            // autoSize={true}
            ref={(el) => (this.flipBook = el)}
          >
            <PageCover>BOOK TITLE</PageCover>
            <Page number={1}>Texto aqui sdfsdfasdfsadfsdafsdsd</Page>
            <Page number={2}>Lorem ipsum...</Page>
            <Page number={3}>Lorem ipsum...</Page>
            <Page number={4}>Lorem ipsum...</Page>
            <Page number={5}>Lorem ipsum...</Page>
            <PageCover>THE END</PageCover>
          </HTMLFlipBook>
        </BookWrapper>
        <div className="container">
          <div>
            <button type="button" onClick={this.prevButtonClick}>
              Previous page
            </button>
            [<span>{this.state.page}</span> of
            <span>{this.state.totalPage}</span>]
            <button type="button" onClick={this.nextButtonClick}>
              Next page
            </button>
          </div>
          <div>
            State: <i>{this.state.user_state}</i>, orientation:{" "}
            <i>{this.state.user_orientation}</i>
          </div>
        </div>
      </Container>
    );
  }
}
