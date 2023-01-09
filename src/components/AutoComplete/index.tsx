import useAutoComplition from "../../hooks/useAutoComplition";

import './index.css';

const Options = [
    {value: "1", label: "John"},
    {value: "2", label: "Jack"},
    {value: "3", label: "Jane"},
    {value: "4", label: "Mike"},
]

export default function AutoComplete() {
    const {proposals, getInputProps, getProposalProps, isLoading} = useAutoComplition({
        delay: 500,
        filter: searchValue => {
            return new Promise(resolve => {
                const options = Options.filter(option => new RegExp(`^${searchValue}`, "i").test(option.label));

                resolve(options.map(o => o.label));
            })
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
            <ul>
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