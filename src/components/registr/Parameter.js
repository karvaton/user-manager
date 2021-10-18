import PropTypes from "prop-types";

function Parameter({ name, title, checked, changeParameter }) {
    return (
        <div key={name} className="parameter">
            <div className="paramName">{title}</div>
            <input
                type="checkbox"
                className="paramView"
                checked={checked}
                onChange={() => changeParameter({name, key: 'checked', value: !checked})}
            />
        </div>
    );
}
Parameter.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    checked: PropTypes.bool,
}

export default Parameter;