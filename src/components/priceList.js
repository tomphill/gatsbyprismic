import React from 'react';
import RichText from './richText';
import styled from 'styled-components';
import PriceItem from './priceItem';

const PriceListWrapper = styled.section`
    max-width: 800px;
    margin: 0 auto;

    >div:last-child{
        display: flex;
    }
`

const PriceList = ({title, prices}) => {
    return (
        <PriceListWrapper>
            <RichText render={title} />
            <div>
            {prices.map((price, i) => {
                return (
                    <PriceItem 
                        mostPopular={price.price_type === 'Most popular'}
                        price={price.price_per_month}
                        title={price.price_list_title}
                        description={price.price_list_description}
                        key={i} />
                )
            })}
            </div>
        </PriceListWrapper>
    )
}

export default PriceList;