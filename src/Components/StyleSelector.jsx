import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { register } from "swiper/element/bundle";
import useStore from "../Storage/useStore";
import { actionName } from "../Storage";

const StyleSelector = () => {
  const swiperRef = useRef(null);
  const [size, setSize] = useState(null);
  const [ActiveIndex, setActiveIndex] = useState(0);
  const { state, dispatch } = useStore();

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    register();
    const params = {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        980: {
          slidesPerView: 4,
        },
      },
      on: {
        slideChange: () => {
          const currentIndex = swiperRef.current?.swiper?.activeIndex;
          currentIndex ? setActiveIndex(currentIndex) : null;
        },
      },
    };

    Object.assign(swiperRef.current, params);
    swiperRef.current.initialize();
  }, []);

  useEffect(() => {
    const selectedItem = state.DataSofa[ActiveIndex];
    if (selectedItem) {
      dispatch({
        type: actionName.setSofaStyle,
        payload: selectedItem.name,
      });
      dispatch({
        type: actionName.setCurrentSofa,
        payload: selectedItem,
      });
    }
  }, [state.DataSofa, dispatch, ActiveIndex]);

  return (
    <div>
      <div className="slider-arrow">
        {size <= 768 && (
          <>
            <button onClick={handlePrev} className="swiper-button-prev">
              <i className="fa-solid fa-angle-left"></i>
            </button>
          </>
        )}
        <div className="slider-container-all">
          <swiper-container init="false" ref={swiperRef}>
            {state.DataSofa && state.DataSofa.length !== 0
              ? state.DataSofa.map((item, index) => {
                  if (
                    state.SofaStyle === "" &&
                    ActiveIndex === 0 &&
                    index === 0
                  ) {
                    dispatch({
                      type: actionName.setSofaStyle,
                      payload: item.name,
                    });
                    dispatch({
                      type: actionName.setCurrentSofa,
                      payload: item,
                    });
                  }
                  return (
                    <swiper-slide key={index}>
                      <div
                        onClick={() => {
                          dispatch({
                            type: actionName.setSofaStyle,
                            payload: item.name,
                          });
                          dispatch({
                            type: actionName.setCurrentSofa,
                            payload: item,
                          });
                        }}
                        className={
                          state.SofaStyle === item.name
                            ? "sofas-styles-selector sofas-styles-selector-active"
                            : "sofas-styles-selector"
                        }
                      >
                        <img
                          src={item?.sofasContent[0].image.node.mediaItemUrl}
                          alt={item?.name}
                        />
                        <h3>{item.name}</h3>
                      </div>
                    </swiper-slide>
                  );
                })
              : null}
          </swiper-container>
        </div>

        {size <= 768 && (
          <>
            <button onClick={handleNext} className="swiper-button-next">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </>
        )}
      </div>

      {size <= 768 ? (
        <p
          className="sofa-content"
          dangerouslySetInnerHTML={{
            __html: state.CurrentSofa?.sofaContent?.information,
          }}
        />
      ) : null}
    </div>
  );
};

export default StyleSelector;
