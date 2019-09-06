const alert = () => {
    window.alert('Sample 1 Alert');
};

export default function init() {
    console.log('Sample 1 script initialization');
    $('button').click(alert);
}
