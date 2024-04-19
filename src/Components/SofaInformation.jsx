import { useState, useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import useStore from "../Storage/useStore";
import { actionName } from "../Storage";

const SofaInformation = () => {
  const verticalSwiperRef = useRef(null);
  const [ActiveIndex, setActiveIndex] = useState(0);
  const { state, dispatch } = useStore();

  useEffect(() => {
    register();

    const params = {
      loop: true,
      autoplaySpeed: 3000,
      spaceBetween: "20px",
      onSwiper: (swiper) => {
        verticalSwiperRef.current = swiper;
      },
      breakpoints: {
        1: {
          slidesPerView: 1,
          direction: "horizontal",
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        980: {
          slidesPerView:
            state.CurrentSofas?.ofasOptions?.sofasInformation?.sofa.length >= 4
              ? 4
              : 3,
          direction: "vertical",
          verticalSwiping: true,
        },
      },
    };

    Object.assign(verticalSwiperRef.current, params);
    verticalSwiperRef.current.initialize();
  }, []);

  useEffect(() => {
    if (
      state.CurrentSofa.sofasContent &&
      state.CurrentSofa.sofasContent.length > 0
    ) {
      const firstItem = state.CurrentSofa.sofasContent[0];
      dispatch({
        type: actionName.setCurrentItemSofa,
        payload: firstItem,
      });
      // Establece el índice activo a 0 cada vez que cambia el contenido
      setActiveIndex(0);
    }
  }, [state.CurrentSofa.sofasContent, dispatch]);

  return (
    <>
      <div className="sofa-information">
        <div className="vertical-slider">
          <swiper-container init="false" ref={verticalSwiperRef}>
            {state.CurrentSofa.sofasContent
              ? state.CurrentSofa.sofasContent?.map((item, index) => {
                  return (
                    <swiper-slide class="item-slider" key={index}>
                      <div
                        onClick={() => {
                          dispatch({
                            type: actionName.setCurrentItemSofa,
                            payload: item,
                          });
                          setActiveIndex(index);
                        }}
                        className={
                          ActiveIndex === index
                            ? "gallery-sofas gallery-sofas-active"
                            : "gallery-sofas"
                        }
                      >
                        <img src={item.image.node.mediaItemUrl} alt="" />
                      </div>
                    </swiper-slide>
                  );
                })
              : null}
          </swiper-container>
        </div>

        <div className="information">
          <div className="information-image">
            <img
              src={state.CurrentItemSofa?.image?.node?.mediaItemUrl}
              alt={state.CurrentItemSofa ? state.CurrentItemSofa?.name : null}
            />
          </div>
          <div className="information-content">
            <h2>{state.CurrentItemSofa?.name}</h2>

            <h5 className={state.CurrentSofa?.price ? "block" : "hidden"}>
              ${state.CurrentItemSofa?.price}
            </h5>
            <p
              className="sofa-content"
              dangerouslySetInnerHTML={{
                __html: state.CurrentItemSofa?.information,
              }}
            />
            <div className="relative">
              <a
                href={
                  state.CurrentItemSofa?.link
                    ? state.CurrentItemSofa?.link
                    : "https://shop.sofa.gruposantamaria.cr/collections"
                }
                target="_blank"
                rel="noreferrer"
                className="button-sofa"
              >
                <span>{state.CurrentItemSofa?.button}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SofaInformation;
