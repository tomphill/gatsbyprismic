import React from 'react';
import Hero from './hero';
import CallToActionGrid from './callToActionGrid';
import PriceList from './priceList';

const SliceZone = ({body}) => {
    console.log(body);
    return (
        <div>
            {body.map((bodyContent, i) => {
                if(bodyContent.type === 'hero2'){
                    return (
                        <Hero 
                            backgroundImage={bodyContent.primary.background_image.url}
                            title={bodyContent.primary.hero_title}
                            content={bodyContent.primary.hero_content}
                            key={i} />
                    )
                }else if(bodyContent.type === 'call_to_action_grid2'){
                    return (
                        <CallToActionGrid 
                            key={i}
                            callToActions={bodyContent.fields}
                            title={bodyContent.primary.section_title} />
                    )
                }else if(bodyContent.type === 'price_list2'){
                    return (
                        <PriceList 
                            key={i}
                            prices={bodyContent.fields}
                            title={bodyContent.primary.title} />
                    )
                }else{
                    return null;
                }
            })}
        </div>
    )
};

export default SliceZone;