import streamlit as st
import json

# Kazi ya kusoma database ya JSON
def load_crops():
    try:
        with open('crops.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        st.error("Database file 'crops.json' not found!")
        return {}

crops_db = load_crops()

# Muonekano wa App
st.set_page_config(page_title="Crop App", page_icon="🌱")
st.title("🌱 Smart Crop Farming Advisor")

# Sehemu ya Search
search_input = st.text_input("Search for a crop (e.g., Peanuts, Avocado, Maize):").lower().strip()

if search_input:
    # Tunatafuta zao ambalo jina lake linafanana na alichoandika mtumiaji
    if search_input in crops_db:
        crop_data = crops_db[search_input]
        
        # Kuonyesha Matokeo
        st.subheader(f"Results for: {search_input.capitalize()}")
        
        col1, col2 = st.columns([1, 1])
        with col1:
            st.image(crop_data['image'], use_container_width=True)
        with col2:
            st.markdown(crop_data['description'], unsafe_allow_html=True)
    else:
        st.warning("Sorry, that crop is not in our database yet. Try another one!")
else:
    st.info("Type the name of a crop above to get expert advice.")

# Footer fupi ya kitaalamu
st.sidebar.info("This app helps farmers get quick advice on crops and modern farming techniques.")
