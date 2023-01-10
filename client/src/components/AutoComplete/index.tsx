import useAutoComplition from "../../hooks/useAutoComplition";

import './index.css';

export default function AutoComplete() {
    const {proposals, getInputProps, getProposalProps, isLoading, proposalListRef} = useAutoComplition({
        delay: 500,
        filter: async searchValue => {
            const res = await fetch(`/api/v1/autocomplete/countries?country=${searchValue}`)

            const data = await res.json()

            return data.map((d: { name: string; }) =>  d.name);
        },
    })

    const inputProps = getInputProps();

    return (
        <div className="AutoComplete">
            <div className="display-flex">
                <input placeholder="Search" {...inputProps} />
                {
                    isLoading && (
                        <div className="icon-container">
                            <i className="loader" />
                        </div>
                    )
                }
            </div>
            <ul ref={proposalListRef}>
                {
                    proposals.map((proposal, index) => {
                        const matched = proposal.match(new RegExp(`^${inputProps.value}`, "i"));

                        return (
                            <li key={`${proposal}-${index}`} {...getProposalProps(index)}>
                                <div className="display-flex option">
                                    <span style={{fontWeight: 'bold'}}>{matched}</span>
                                    {proposal.slice((matched?.index ?? 0) + inputProps.value.length)}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    )
}